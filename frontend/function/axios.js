import axios from "axios";

const url = "https://j6c103.p.ssafy.io/api/";
const django_url = 'https://j6c103.p.ssafy.io/django/api/'

// ************************************ 회원 기능 ************************************
// 로그인 (회원 정보 DB에 저징)
export const sendUserUid = async (userUid, displayName, photoURL) => {
    const url2 = "https://j6c103.p.ssafy.io/api/user";

    let data = {
        name: displayName,
        profile: photoURL,
        userUid: userUid,
    }
    axios
    .post(url2,  JSON.stringify(data), {
        headers: {
            "Content-Type": `application/json`,
        },
        proxy: url2
        })
        .then((res) => {
            console.log("로그인 성공 & 회원정보 DB 전송 완료");
        }
    );
};

// 회원 정보 불러오기
export async function bringUser(userUid) {
    let res = await axios.get(`${url}`+ `user` + `/` + `${userUid}`)
    return res;
}

// 프로필 사진 변경
export async function changePic(userUid, formData) {
    const url2 = "https://j6c103.p.ssafy.io/api/user/";

    await axios({
        method: 'put',
        url: url2 + `${userUid}`,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then((res) => location.reload());
}

// 아이디 변경
export async function changeProfileName(name, userUid) {

    const url2 = "https://j6c103.p.ssafy.io/api/user/";

    let data = {
        name: name,
        userUid: userUid,
    }
    axios
    .put(url2,  JSON.stringify(data), {
        headers: {
            "Content-Type": `application/json`,
        },
        proxy: url2
        })
        .then((res) => {
            console.log("로그인 성공 & 회원정보 DB 전송 완료");
    });
}

// 회원탈퇴
export const memberDelete = async (userUid) => {
    axios.delete(`${url}` + `user` + `/` + `${userUid}`)
}



// ************************************ 게시판 기능 ************************************
// 추천 캠핑장 (메인화면 켐핑장 추천 기능 구현)
export const viewCamping = async () => {
    return await axios.get(`${url}`+ `mainRecommend`)
};

// 게시판 목록 출력 (전체)
export const campingBoard = async (page) => {
    return await axios.get(`${url}board?page=${page}`)
}

// 게시판 목록 출력 (카테고리볗)
export const campingBoard_cate = async (category, page) => {
    return await axios.get(`${url}board?category=${category}&page=${page}`)
}

// 게시판 목록 출력 (상세조회)
export const campingBoardMore = async (boardId) => {
    return await axios.get(`${url}`+`board`+ `/` + `${boardId}`)
}

// 캠핑장 이름 검색
export const searchCamp = async (word) => {
    return await axios.get(`${url}`+`camping`+ `/` + `${word}`)
}

// 게시글 작성
export async function sendArticle(dataDto, files) {

    const newForm = new FormData();
    newForm.append("board", new Blob([JSON.stringify(dataDto)], { type: "application/json" }))
    
    if (files !== null) {
        for (let i = 0; i < files.length; i++) {
            newForm.append("files",files[i])
        }
    }
    

    const url2 = "https://j6c103.p.ssafy.io/api/board";

    return await axios({
        method: 'post',
        url: url2,
        data: newForm,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    // .then((res) => {
    //     console.log("게시글 작성 완료");
    //     document.location.href = "/board";
    // });
}

// 게시글 수정
export async function modifyArticle(dataDto, files) {

    const newForm = new FormData();
    newForm.append("board", new Blob([JSON.stringify(dataDto)], { type: "application/json" }))
    
    if (files !== null) {
        for (let i = 0; i < files.length; i++) {
            newForm.append("files",files[i])
        }
    }
    
    const url2 = "https://j6c103.p.ssafy.io/api/board";

    return await axios({
        method: 'put',
        url: url2,
        data: newForm,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    // .then((res) => {
    //     console.log("게시글 수정 완료");
    //     document.location.href = "/board";
    // });
}

// 게시글 삭제
export const articleDelete = async (boardId) => {
    axios.delete(`${url}` + `board` + `/` + `${boardId}`)
        // .then((res) => {
        //     console.log("게시글 삭제");
        //     document.location.href = "/board";
        // });
}

// 게시글 검색
export const searchArticle = async (word) => {
    return await axios.get(`${url}`+`board/search?word=` + `${word}`)
}



// ************************************ 댓글 기능 ************************************
// 댓글 조회
export const commentSearch = async (boardId) => {
    return await axios.get(`${url}`+`comment?boardId=` + `${boardId}`)
}

// 댓글 작성
export const sendComment = async (boardId, comment, userUid) => {
    const url2 = "https://j6c103.p.ssafy.io/api/comment";

    let data = {
        boardId: boardId,
        comment: comment,
        userUid: userUid,
    }
    axios
    .post(url2,  JSON.stringify(data), {
        headers: {
            "Content-Type": `application/json`,
        },
        proxy: url2
        })
        .then((res) => {
            console.log("댓글 작성 완료");
        }
    );
};


// 댓글 수정
export const modifyComment = async ( comment, commentId ) => {
    const url2 = "https://j6c103.p.ssafy.io/api/comment";

    let data = {
        comment: comment,
        commentId: commentId,
    }
    axios
    .put(url2,  JSON.stringify(data), {
        headers: {
            "Content-Type": `application/json`,
        },
        proxy: url2
        })
        .then((res) => {
            console.log("댓글 수정 완료");
        }
    );
};

// 댓글 삭제
export const commentDelete = async (commentId) => {
    axios.delete(`${url}`+ `comment`+ `/` + `${commentId}`).then(() => location.reload())
}


// ************************************ 캠핑장 기능 ************************************
// 캠핑장 기능 (로그인 시)
export const receiveCamping_in = async (campingId, userUid) => {
    return await axios.get(`${url}` + `camping?campingId=${campingId}&userUid=${userUid}`)
}

// 캠핑장 기능 (로그아웃 시)
export const receiveCamping_out = async (campingId) => {
    return await axios.get(`${url}`+`camping?campingId=${campingId}`)
}

// 캠핑장 상세보기 내, 후기 목록
export const viewBoard = async (campingId, page) => {
    return await axios.get(`${url}`+`board/review?campingId=${campingId}&page=${page}`)
}

// 북마크
export const BookMark = async (campingId, userUid) => {
    return await axios.get(`${url}`+`bookmark?campingId=${campingId}&userUid=${userUid}`)
}

// 방문체크
export const VisitCheck = async (campingId, userUid) => {
    return await axios.get(`${url}`+`visit?campingId=${campingId}&userUid=${userUid}`)
}

// 캠핑 관련 쇼핑
export const Shoppingcamp = async (page) => {
    return await axios.get(`${url}`+`shop?page=${page}`)
}


// 캠핑 관련 뉴스 목록
export const Newscamp = async (page) => {
    return await axios.get(`${url}`+`news?page=${page}`)
}

// 캠핑장 사진 불러오기
export const campingImage = async (campingId) => {
    return await axios.get(`${url}camping/image?campingId=${campingId}`)
}

// ************************************ 마이페이지 기능 ************************************
// 방문한 캠핑장 목록
export const VisitList = async (userUid, page) => {
    return await axios.get(`${url}`+`visit/user?page=${page}&userUid=${userUid}`)
}

// 북마크한 캠핑장 목록
export const BookMarkList = async (userUid, page) => {
    return await axios.get(`${url}`+`bookmark/user?page=${page}&userUid=${userUid}`)
}

// 내가 쓴 리뷰 목록
export const ReviewList = async (campingId, page) => {
    return await axios.get(`${url}`+`board/user?page=${page}&userUid=${campingId}`)
}


// ******************************* 설문 조사 ******************************************
// 설문 조사 등록
export const sendSurvey = async (q1,q2,q3,q4,uid,x,y) => {

    let data = {
        q1Equipment: q1,
        q2Distance: q2,
        q3Environment: q3,
        q4Pet: q4,
        userUid: uid,
        userX: x,
        userY: y
    }

        return await axios.post(`${url}survey`, data)
    }


// 설문 조사 여부 확인
export const isSurvey = async (uid) => {
    return await axios.get(`${url}survey/${uid}`)
}


// ***************************** Django API *********************************************
// 상세검색 결과
export const filterResults = async (query) => {
    return await axios.get(`${django_url}${query}`)
}

// recommend1
export const recommend1 = async (uid) => {
    return await axios.get(`${django_url}recommend1/${uid}`)
}

// recommend2
export const recommend2 = async (uid) => {
    return await axios.get(`${django_url}recommend2/${uid}`)
}

// 비슷한 캠핑장
export const similar = async (campingId) => {
    return await axios.get(`${django_url}similar/${campingId}`)
}

// 방문한 캠핑장
export const visit = async (uid) => {
    return await axios.get(`${django_url}visit/${uid}`)
}

// 지도 검색
export const mapsearch = async (x1,y1,x2,y2) => {
    return await axios.get(`${django_url}mapsearch/${x1}/${y1}/${x2}/${y2}`)
}


// ***************************** 지역 검색 *********************************************
// 지역검색
export const searchArea = async (addr1,addr2,camping,page) => {
    return await axios.get(`${url}camping/search?doNm=${addr1}&facltNm=${camping}&page=${page}&sigunguNm=${addr2}`)
}