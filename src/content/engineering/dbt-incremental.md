---
title: dbt incremental 모델로 대용량 데이터 처리하기
date: 2026-03-05
description: 수억 건의 로그를 매일 처리하면서 배운 것들. incremental 전략 선택의 기준과 함정.
heroImage: https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80
draft: false
---

데이터 파이프라인이 점점 느려지기 시작한 건 어느 날 갑자기였다. 정확히 말하면 데이터가 쌓이면서 서서히 느려졌는데, 어느 날 임계점을 넘어버린 것이다. 매일 밤 돌아가는 배치 작업이 여섯 시간을 넘기기 시작했다.

문제는 dbt 모델 구조에 있었다. 모든 모델이 `config(materialized='table')`로 설정되어 있었다. 매일 전체를 다시 만들었다. 데이터가 수백만 건일 때는 괜찮았는데, 수억 건이 되면서 버텨낼 수 없게 되었다.

## incremental이란 무엇인가

해결책은 incremental 전략이었다. 하지만 단순히 `materialized='incremental'`로 바꾼다고 끝나는 게 아니었다.

incremental 모델의 핵심은 어떤 데이터가 "새 데이터"인지 정의하는 것이다. dbt는 세 가지 전략을 제공한다: `append`, `merge`, `delete+insert`. 어떤 걸 고를지는 데이터의 특성에 따라 다르다.

```sql
-- 예: merge 전략
{{
  config(
    materialized='incremental',
    unique_key='event_id',
    incremental_strategy='merge'
  )
}}

select * from {{ source('raw', 'events') }}
{% if is_incremental() %}
  where created_at > (select max(created_at) from {{ this }})
{% endif %}
```

## 전략 선택 기준

로그성 데이터처럼 한 번 쌓이면 수정되지 않는 경우는 `append`로 충분하다. 하지만 이벤트 기반 데이터는 late-arriving 데이터 문제가 있다. 이틀 전 데이터가 오늘 들어오는 경우. 이런 경우 `merge`를 써야 하고, `unique_key`를 정확하게 설정해야 한다.

주의할 점이 하나 있다. `is_incremental()` 블록 안의 조건식이 너무 좁으면 데이터 누락이 생긴다. 일반적으로는 최소 3일치 window를 잡아두는 것이 안전하다.

## 결과

작업 후 배치 시간은 여섯 시간에서 40분으로 줄었다. 대부분의 모델이 마지막 24시간 데이터만 처리하면 되기 때문이다.

이 경험에서 얻은 가장 큰 교훈: 처음 설계할 때 데이터 볼륨이 어디까지 커질지를 생각해두어야 한다. 나중에 고치는 것은 언제나 더 비싸다.
