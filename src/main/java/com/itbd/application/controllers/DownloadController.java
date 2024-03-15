package com.itbd.application.controllers;

import com.itbd.application.annotations.AppAccess;
import com.itbd.application.annotations.RBACAccess;
import com.itbd.application.constants.enums.appresource.AppPermissionsEnum;
import com.itbd.application.constants.enums.appresource.AppResourcesEnum;
import jakarta.annotation.security.RolesAllowed;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Base64;
import java.util.Optional;

@RestController
@RequestMapping(value = "/v1/content")
@RBACAccess
@Slf4j
public class DownloadController {
    @Value("${itbd.server.file.source}")
    protected String fileSource;

    @GetMapping(value = "/image", produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody byte[] getImage(@RequestParam String imagePath) throws IOException {
        Path path = Path.of(fileSource, urlBase64Decode(imagePath));
        File file = path.toFile();
        if (file.exists()) {
            return FileUtils.readFileToByteArray(file);
        }
//        return FileUtils.readFileToByteArray(new ClassPathResource("META-INF/resources/images/default/no_image.png", this.getClass().getClassLoader()).getFile());
        return null;
    }


    @GetMapping(value = "/byte")
    @RolesAllowed("USER_STREAM_DOWNLOAD:DOWNLOAD")
    @AppAccess(resource = AppResourcesEnum.USER_STREAM_DOWNLOAD, action = AppPermissionsEnum.DOWNLOAD, name = "Download", description = "Download file")
    public ResponseEntity<Resource> getByte(@RequestParam String filePath) throws IOException {
//        log.info("Image request Found!");
        Path path = Path.of(fileSource, urlBase64Decode(filePath));
        File file = path.toFile();
        if (file.exists()) {
            HttpHeaders headers = new HttpHeaders();
            headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
            headers.add("Pragma", "no-cache");
            headers.add("Expires", "0");
            headers.add("Content-Disposition", String.format("attachment; filename=\"" + file.getName() + "\""));

            InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
//            return ResponseEntity.ok().headers(headers).contentLength(file.length()).contentType(MediaType.APPLICATION_OCTET_STREAM).body(resource);
            String contentType = Optional.ofNullable(Files.probeContentType(file.toPath())).orElse("application/octet-stream");
            return ResponseEntity.ok().headers(headers).contentLength(file.length()).contentType(MediaType.parseMediaType(contentType)).body(resource);
        }
        return ResponseEntity.notFound().build();
    }

    public static String urlBase64Encode(String value) {
        return Base64.getUrlEncoder().encodeToString(value.getBytes(StandardCharsets.UTF_8));
    }

    public static String urlBase64Decode(String value) {
        return new String(Base64.getUrlDecoder().decode(value));
    }
}
