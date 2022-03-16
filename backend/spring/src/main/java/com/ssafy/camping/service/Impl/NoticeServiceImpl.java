package com.ssafy.camping.service.Impl;

import com.ssafy.camping.dto.Notice.NoticeReqDto;
import com.ssafy.camping.entity.FileNotice;
import com.ssafy.camping.entity.Notice;
import com.ssafy.camping.repository.NoticeRepository;
import com.ssafy.camping.service.FileService;
import com.ssafy.camping.service.NoticeService;
import com.ssafy.camping.utils.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {

    private final NoticeRepository noticeRepository;
    private final FileService fileService;

    @Override
    public Map<String, Object> postNotice(NoticeReqDto noticeReqDto, MultipartFile[] files) throws Exception {
        log.debug("NoticeService postNotice call");
        Map<String, Object> resultMap = new HashMap<>();

        //게시글 등록
        Notice notice = Notice.builder()
                .userUid(noticeReqDto.getUserUid())
                .category(noticeReqDto.getCategory())
                .title(noticeReqDto.getTitle())
                .content(noticeReqDto.getContent()).build();
        noticeRepository.save(notice);

        //파일이 존재할 경우 게시글 파일 저장
        if(files != null){
            //파일 확장자 검사
            if(!fileService.fileExtensionCheck(files)) {
                resultMap.put("message", Message.FILE_EXTENSION_EXCEPTION);
                return resultMap;
            }
            //파일 저장
            fileService.noticeFileSave(notice, files);
        }

        resultMap.put("message", Message.CREATE_NOTICE_SUCCESS);
        resultMap.put("noticeId", notice.getNoticeId());

        return resultMap;
    }

    @Override
    @Transactional
    public Map<String, Object> deleteNotice(Integer noticeId) throws Exception {
        log.debug("NoticeService deleteNotice call");

        Map<String, Object> resultMap = new HashMap<>();
        Optional<Notice> notice = noticeRepository.findById(noticeId);
        if(!notice.isPresent()) {
            resultMap.put("message", Message.NOT_FOUND_NOTICE);
            return resultMap;
        }

        //해당 게시글 파일 삭제
        if(notice.get().getFiles()!=null) {
            List<FileNotice> files = notice.get().getFiles();
            fileService.noticeFileDelete(files);
        }

        //게시글 삭제
        noticeRepository.deleteById(noticeId);

        resultMap.put("message", Message.DELETE_NOTICE_SUCCESS);
        return resultMap;
    }
}
