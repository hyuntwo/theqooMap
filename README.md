# 🍽️ 더쿠 맛집 지도

더쿠에서 추천하는 서울 중심 수도권 맛집들을 지도에서 확인할 수 있는 웹서비스입니다.

## ✨ 주요 기능

- **지도 기반 맛집 탐색**: 카카오맵을 통해 맛집 위치를 시각적으로 확인
- **카테고리별 필터링**: 93개 음식 카테고리별로 맛집 검색
- **실시간 검색**: 맛집 이름, 카테고리, 위치로 검색
- **반응형 디자인**: 모바일과 데스크톱에서 모두 사용 가능
- **맛집 상세 정보**: 지도 마커 클릭 시 맛집 정보 표시
- **모던 웹 기술**: TypeScript, React, Vite를 활용한 현대적인 웹 애플리케이션

## 🚀 시작하기

### 1. 카카오맵 API 키 발급

1. [카카오 개발자 센터](https://developers.kakao.com/)에 로그인
2. 애플리케이션 생성
3. JavaScript 키 발급
4. 웹 플랫폼 등록 (도메인 설정)

### 2. API 키 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```bash
VITE_KAKAO_MAP_API_KEY=your_kakao_map_api_key_here
```

`your_kakao_map_api_key_here`를 발급받은 실제 API 키로 교체하세요.

**주의**: `.env` 파일은 `.gitignore`에 추가되어 있어야 하며, API 키가 공개 저장소에 노출되지 않도록 주의하세요.

### 3. 프로젝트 실행

#### 의존성 설치
```bash
npm install
```

#### 개발 서버 실행
```bash
npm run dev
```

#### 프로덕션 빌드
```bash
npm run build
```

#### 빌드 결과 미리보기
```bash
npm run preview
```

## 🛠️ 기술 스택

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3
- **Map API**: Kakao Maps JavaScript API
- **Package Manager**: npm

## 📁 프로젝트 구조

```
theqooMap/
├── src/
│   ├── components/          # React 컴포넌트
│   │   ├── Map.tsx         # 카카오맵 컴포넌트
│   │   ├── RestaurantList.tsx # 맛집 목록 컴포넌트
│   │   ├── SearchBar.tsx   # 검색바 컴포넌트
│   │   └── RestaurantCard.tsx # 맛집 카드 컴포넌트
│   ├── hooks/              # 커스텀 훅
│   │   └── useKakaoMap.ts # 카카오맵 관련 로직
│   ├── types/              # TypeScript 타입 정의
│   │   └── index.ts        # 공통 타입들
│   ├── data/               # 정적 데이터
│   │   └── restaurants.ts  # 맛집 데이터
│   ├── App.tsx             # 메인 앱 컴포넌트
│   ├── App.css             # 앱 스타일
│   └── index.tsx           # 앱 진입점
├── public/                 # 정적 파일들
├── index.html              # HTML 템플릿
├── package.json            # 프로젝트 설정 및 의존성
├── tsconfig.json           # TypeScript 설정
├── vite.config.ts          # Vite 설정
└── README.md               # 프로젝트 설명서
```

## 🍜 포함된 맛집 카테고리

더쿠 게시글에서 추출한 93개 음식 카테고리:

1. 평양냉면
2. 메밀국수 (소바)
3. 막국수
4. 콩국수
5. 국밥, 해장국
6. 설렁탕
7. 감자탕
8. 순대
9. 닭볶음탕
10. 추어탕
... (총 93개)

## 🎯 사용법

### 검색 기능
- **텍스트 검색**: 맛집 이름, 카테고리, 위치로 검색
- **카테고리 필터**: 드롭다운에서 특정 음식 카테고리 선택

### 지도 조작
- **마커 클릭**: 맛집 상세 정보 표시
- **목록 클릭**: 해당 맛집으로 지도 이동 및 확대

### 반응형 기능
- **데스크톱**: 지도와 맛집 목록을 나란히 표시
- **모바일**: 지도와 목록을 세로로 배치

## 🔧 개발 및 커스터마이징

### 개발 환경 설정

1. **Node.js 설치**: Node.js 18.x 이상 필요
2. **의존성 설치**: `npm install`
3. **개발 서버 실행**: `npm run dev`

### 맛집 데이터 추가/수정

`src/data/restaurants.ts` 파일의 `restaurantData` 배열을 수정하여 맛집 정보를 추가하거나 수정할 수 있습니다:

```typescript
{
    id: "unique_id",
    name: "맛집 이름",
    category: "카테고리",
    location: "위치 설명",
    lat: 위도,
    lng: 경도,
    description: "맛집 설명"
}
```

### 컴포넌트 수정

각 React 컴포넌트는 `src/components/` 디렉토리에 있으며, 필요에 따라 수정할 수 있습니다.

### 스타일 수정

`src/App.css` 파일을 수정하여 웹서비스의 디자인을 커스터마이징할 수 있습니다.

## 📱 지원 브라우저

- Chrome (권장)
- Firefox
- Safari
- Edge

## 📄 라이선스

이 프로젝트는 교육 및 개인 사용 목적으로 제작되었습니다.

## 🙏 데이터 출처

맛집 정보는 [더쿠 맛집 리스트](https://theqoo.net/hot/3864717716)에서 가져왔습니다.

## 🐛 문제 해결

### 지도가 표시되지 않는 경우
1. 카카오맵 API 키가 올바르게 설정되었는지 확인
2. 브라우저 콘솔에서 오류 메시지 확인
3. 도메인이 카카오 개발자 센터에 등록되었는지 확인

### 검색이 작동하지 않는 경우
1. JavaScript가 활성화되어 있는지 확인
2. 브라우저 캐시 삭제 후 재시도

### 개발 서버 실행 문제
1. Node.js 버전이 18.x 이상인지 확인
2. `npm install`로 의존성이 제대로 설치되었는지 확인
3. 포트 3000이 사용 가능한지 확인

## 🚀 배포

### 정적 호스팅 (Netlify, Vercel 등)
```bash
npm run build
```
빌드된 `dist` 폴더를 호스팅 서비스에 업로드

### GitHub Pages
```bash
npm run build
```
빌드된 `dist` 폴더를 `gh-pages` 브랜치에 푸시

## 📞 문의

문제가 발생하거나 개선 사항이 있으시면 이슈를 등록해 주세요. 