import express from 'express';
import { addUser, getUser } from '../controllers/user';
import { getAllAwards, getDetailAward, addAward } from '../controllers/award';

const router = express.Router();

// 받는 사람
router.post('/user', addUser); // 생성 또는 조회, 애칭 입력 시 이벤트 발생
// 보내는 사람
router.get('/:userId', getUser); // 링크 클릭 시 할당되는 주소, :userId가 받는 사람의 키 값임

// - 수상내역 조회
router.get('/award', getAllAwards); // 조회, 보관함 버튼 클릭 또는 수상 내역 전체보기
router.get('/award/:awardId', getDetailAward); // 조회, 수상 내역 상세보기
// - 수여
router.post('/award', addAward); // 상장 생성, :userId를 post로 전송

export default router;
