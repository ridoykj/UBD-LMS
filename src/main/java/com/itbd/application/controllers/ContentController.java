package com.itbd.application.controllers;

import net.coobird.thumbnailator.Thumbnails;
import org.apache.commons.io.FileUtils;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.util.Arrays;

public class ContentController {

    enum ThumbnailVariant {
        LOW("temp/100", 100),
        MEDIUM("temp/200", 200),
        ORIGINAL("/", 0);
        private String path;
        private Integer width;

        ThumbnailVariant(String path, Integer width) {
            this.path = path;
            this.width = width;
        }
    }

    protected static void processFile(byte[] fileData, String filePath, String fileName, String mimeType) throws IOException {
        File file = Path.of(filePath, fileName).toFile();
        if (mimeType.startsWith("image/")) {
            for (ThumbnailVariant tv : ThumbnailVariant.values())
                imageThumbnail(Arrays.copyOf(fileData, fileData.length), filePath, fileName, mimeType, tv);
        } else {
            FileUtils.writeByteArrayToFile(file, fileData);
        }
    }

    private static void imageThumbnail(byte[] bytes, String filePath, String fileName, String extension, ThumbnailVariant tv) throws IOException {
        File output = Path.of(filePath, tv.path, fileName).toFile();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        BufferedImage bufferedImage = ImageIO.read(new ByteArrayInputStream(bytes));

        if (tv == ThumbnailVariant.ORIGINAL)
            FileUtils.writeByteArrayToFile(output, bytes);
        else if (bufferedImage != null) {
            Thumbnails.of(bufferedImage).width(tv.width).outputFormat(extension.split("/")[1]).toOutputStream(outputStream);
            FileUtils.writeByteArrayToFile(output, outputStream.toByteArray());
        } else throw new IOException("Failed to generate thumbnail");
    }
}
