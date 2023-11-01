package com.store.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Objects;

import static com.store.utils.Constants.CONVERTING_FILE_ERROR;


@Slf4j
public class FileHandlerUtils {
    private FileHandlerUtils() {
        // utils class
    }

    public static File convertMultiPartFileToFile(MultipartFile file) {
        File convertedFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
        try (FileOutputStream fileOutputStream = new FileOutputStream(convertedFile)) {
            fileOutputStream.write(file.getBytes());
        } catch (IOException exception) {
            log.error(CONVERTING_FILE_ERROR, exception);
        }
        return convertedFile;
    }
}
