const db = require('../models/index'); // 모델을 불러옴
const Notice = db.notice; // Notice 모델

// 공지사항 작성 페이지 렌더링 함수
exports.getNoticePage = (req, res) => {
    res.render('manager/getNotice', { layout: 'managerLayout' }); // getNotice.ejs 렌더링
};

// 공지사항 작성 함수
exports.createNotice = async (req, res) => {
    try {
        const { subject, contents } = req.body;
        
        // 현재 날짜와 시간을 구함
        const writeDate = new Date();

	// 공지사항 저장
        const newNotice = await Notice.create({
            writeDate: writeDate,
	    title: subject,
            contents: contents
        });

	res.redirect('/manager/getNotice');
    } catch (error) {
        res.status(500).json({ message: '공지사항을 저장하는 중 오류가 발생했습니다.', error: error.message });
    }
};
