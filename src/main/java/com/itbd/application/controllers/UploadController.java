package com.itbd.application.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
public class UploadController {
    @Value("${itbd.server.file.source}")
    protected String fileSource;
    @PostMapping("/api/fileupload")
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
}
