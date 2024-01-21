package com.itbd.application.controllers;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
public class UploadController {
    @PostMapping("/api/fileupload")
    public void handleFileUpload(@RequestHeader Map<String, String> headers,
                                 @RequestParam("file") List<MultipartFile> files) {
        log.info("headers name: {}", headers.get("path"));
        files.forEach(fileE -> {
            log.info("File name: {}", fileE.getOriginalFilename());
            File file = new File("./uploadedFile/" + fileE.getOriginalFilename());
            try {
                byte[] bytes = fileE.getBytes();
                FileUtils.writeByteArrayToFile(file, bytes);
            } catch (IOException e) {
                log.error("Error: {}", e.getMessage());
            }
        });
    }
}
