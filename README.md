# Meta Repo
<img width="794" alt="스크린샷 2022-08-07 오후 9 33 48" src="https://user-images.githubusercontent.com/81023768/183292775-782bc2a9-ab53-43a2-ae69-727b255ff570.png">  

---  

<img width="806" alt="스크린샷 2022-08-07 오후 9 34 12" src="https://user-images.githubusercontent.com/81023768/183292780-9cc9360a-99d4-4177-bd16-451eee75df55.png">

---

- 기간 : 2022.08.02 ~ 2022.08.07
- 목표 : React를 이용해서 Meta의 Github의  Repositories 페이지 구현하기
- 구현 기능
    - API를 받아온 데이터를 state로 저장
    - 필터링
        - 3가지 검색어 필터 타입 구현 (name, topic, description)
        - 검색어 기준 필터링 구현
        - 필터 초기화 구현
    - 정렬
        - 오름차순 / 내림차순 정렬 구현
        - Created, Updated, Pushed, Full Name 기준 정렬  구현
        - Language 기준 정렬 구현
        
    - 한 페이지당 10개의 List, 총 4개의 Page로 구성
    - 현재 페이지 컬러포인트
    - Local Storage를 이용한 데이터 저장
    - 검색창 throttling 처리
    - 업데이트 된 시간 포맷팅
- 아쉬운 점
    - 직관적이지 못한 변수명
    - API 초기 로딩이 오래걸림
    - topic 클릭을 통해 해당 토픽이 포함된 Repositories를 보여주는 기능을 구현하지 못함
    - 타입스크립트의 필요성을 느꼇지만 제대로 사용하지 못했음
    - 리스트 하단에 Star 갯수를 나타내는 숫자 표현이 아쉬움
- 어려웠던 점
    - API를 다뤄본 적이 별로 없어서 다루기 어려웠다
    - 더 작은 단위의 컴포넌트를 만들고 사용하고 싶었지만 컴포넌트간 데이터를 교환하고 리렌더링 되는 과정을 이해하기가 어려웠다
