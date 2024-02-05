package com.itbd.application.controllers;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping(value = "/v1/content")
public class UploadController {
    @Value("${itbd.server.file.source}")
    protected String fileSource;

    @PostMapping(value = "/api/fileupload")
    public void handleFileUpload(@RequestHeader Map<String, String> headers,
                                 @RequestParam("file") List<MultipartFile> files) {
        log.info("headers name: {}", headers.get("path"));
        files.forEach(fileE -> {
            String fileName = headers.containsKey("filename") ? headers.get("filename") : fileE.getOriginalFilename();
            log.info("File name: {}", fileName);
            Path path = Path.of(fileSource, headers.get("path"), fileName);
            File file = path.toFile();
            if (!file.exists()) {
                try {
                    FileUtils.touch(file);
                } catch (IOException e) {
                    log.error("Error: {}", e.getMessage());
                }
            }
            try {
                byte[] bytes = fileE.getBytes();
                FileUtils.writeByteArrayToFile(file, bytes);
            } catch (IOException e) {
                log.error("Error: {}", e.getMessage());
            }
        });
    }

    @PostMapping(value = "/upload/image")
    public void handleImageUpload(@RequestHeader Map<String, String> headers,
                                  @RequestParam("file") List<MultipartFile> files) {
        files.forEach(fileE -> {
            String fileName = headers.containsKey("filename") ? headers.get("filename") : fileE.getOriginalFilename();
            log.info("File name: {}", fileName);
            Path path = Path.of(fileSource, headers.get("path"), fileName);
            File file = path.toFile();
            try {
                if (!file.exists()) FileUtils.touch(file);
                byte[] bytes = fileE.getBytes();
                ContentController.processFile(bytes, file.getParent(), fileName, fileE.getContentType());
//                FileUtils.writeByteArrayToFile(file, bytes);
            } catch (IOException e) {
                log.error("Error: {}", e.getMessage());
            }
        });
    }
}
