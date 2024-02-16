package com.itbd.application.controllers;

import com.itbd.application.services.reports.WReportBuilder;
import com.vaadin.flow.server.StreamResource;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


//@BrowserCallable
@Endpoint
@AnonymousAllowed
public class ReportManagerController {
    @Autowired
    private WReportBuilder wReportBuilder;

    public ResponseEntity<Resource> getReport() {
        Map<String, Object> parameters = new HashMap<>();
        byte[] bytes = wReportBuilder.getByteStream("class/class_schedule_rpt.jrxml", parameters, "class_schedule_rpt");

        HttpHeaders headers = new HttpHeaders();
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");

        InputStreamResource resource = new InputStreamResource(new ByteArrayInputStream(bytes));
        return ResponseEntity.ok().headers(headers).contentLength(bytes.length).contentType(MediaType.APPLICATION_PDF).body(resource);

    }

    public StreamResource getReportStream() {
        Map<String, Object> parameters = new HashMap<>();
        return wReportBuilder.getStreamResource("class/class_schedule_rpt.jrxml", parameters, "class_schedule_rpt");
    }

    public @ResponseBody byte[] getReportByte() throws IOException {
        Map<String, Object> parameters = new HashMap<>();
        byte[] bytes =  wReportBuilder.getByteStream("class/class_schedule_rpt.jrxml", parameters, "class_schedule_rpt");
        FileUtils.writeByteArrayToFile(new File("D:\\itbd\\home\\org\\reports\\class\\class_schedule_rpt.pdf"), bytes);
        return bytes;
    }
}
