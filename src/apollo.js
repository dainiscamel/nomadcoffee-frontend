import { makeVar } from "@apollo/client";

// Reactive Variables ? 아폴로 클라이언트 캐시 외부에 로컬 상태를 저장하는 데 사용.
export const isLoggedInVar = makeVar(false);
export const darkModeVar = makeVar(false);
