package com.itbd.application.controllers;

import com.itbd.application.services.reports.WReportBuilder;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


//@BrowserCallable
@Endpoint
@AnonymousAllowed
//@Service
public class ReportManagerController {
    @Autowired
    private WReportBuilder wReportBuilder;

    public byte[] getReportByte() throws IOException {
        Map<String, Object> parameters = new HashMap<>();
        byte[] bytes = wReportBuilder.getByteStream("class/class_schedule_rpt.jrxml", parameters, "class_schedule_rpt");
//        FileUtils.writeByteArrayToFile(new File("D:\\itbd\\home\\org\\reports\\class\\class_schedule_rpt.pdf"), bytes);
        return bytes;
    }
}
