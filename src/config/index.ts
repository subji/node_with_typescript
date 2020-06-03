import dotenv from 'dotenv';

// NODE_ENV 가 없을 때 기본을 'development' 로 설정
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const foundEnvironment = dotenv.config();

// 해당 에러는 전체 시스템에 영향이 간다.
if (foundEnvironment.error) {
  throw new Error('.env 파일을 찾을 수 없습니다.');  
}

export default {
  port: process.env.PORT,
  logs: process.env.LOG_LEVEL || 'silly'
};