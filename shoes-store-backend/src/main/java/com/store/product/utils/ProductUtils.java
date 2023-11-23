package com.store.product.utils;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.store.config.AwsConfigProperties;
import com.store.product.dto.ProductRequest;
import com.store.product.dto.ProductResponse;
import com.store.product.models.Product;
import com.store.user.security.CustomerUserDetailsService;
import com.store.utils.FileHandlerUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Scanner;
import java.util.function.BiFunction;
import java.util.function.Function;

@Slf4j
public class ProductUtils {
    private ProductUtils(){}

    public static File convertMultiFileToFile(MultipartFile multipartFile){
        File productsFile = new File(Objects.requireNonNull(multipartFile.getOriginalFilename()));
        try(FileOutputStream fos = new FileOutputStream(productsFile)) {
            fos.write(multipartFile.getBytes());
        }catch (IOException e){
           log.error("error converting products file: {}",e.getMessage());
        }
        return productsFile;
    }
    public static List<ProductRequest> productRequestListFile(MultipartFile products){
        File file = convertMultiFileToFile(products);
        List<ProductRequest> productRequests = new ArrayList<>();

        if (file.isFile()){
            try(Scanner scanner = new Scanner(new BufferedReader(new FileReader(file)))) {
                String[]productsData;
                while (scanner.hasNextLine()){
                    String inputs = scanner.nextLine().replace("\"", "");
                    if (inputs.startsWith("stock")){
                        continue;
                    }
                    productsData = inputs.split(",");
                    if (productsData.length>=6){
                        StringBuilder builder = new StringBuilder();
                        for (int i = 6; i<productsData.length;i++){
                            builder.append(productsData[i]);
                            productsData[i] = null;
                        }
                        productsData[6] = builder.toString();
                    }
                    if (productsData[4].endsWith("png") || productsData[4].endsWith("jpg")){
                        String productUrl = (productsData[3]+","+productsData[4]).replace(" ","");
                        System.out.println(productUrl);
                        productsData[3] = productUrl;
                        productsData[4] = null;
                    }

                    StringBuilder stringBuilder = new StringBuilder();
                    for (String data:productsData){
                        if (data != null){
                            stringBuilder.append(data).append(";");
                        }
                    }
                    productsData = stringBuilder.toString().split(";");
                    ProductRequest productRequest = new ProductRequest(
                            Integer.parseInt(productsData[0]),
                            productsData[1],
                            productsData[2],
                            productsData[3],
                            Float.parseFloat(productsData[4]),
                            productsData[5]
                    );
                    productRequests.add(productRequest);
                }

                }catch (IOException e){
                log.error("error handling file: {}",e.getMessage());
            }

            return productRequests;
        }
        return null;
    }

    public static BiFunction<ProductRequest, CustomerUserDetailsService,Product> getProductRequestHandler(){
    return (productReq,requestUser)->Product.builder()
            .name(productReq.productName())
            .url(productReq.productUrl())
            .description(productReq.description())
            .price(productReq.price())
            .stock(productReq.stock())
            .category(productReq.category())
            .createdAt(LocalDateTime.now())
            .updatedAt(LocalDateTime.now())
            .userId(requestUser.getId())
            .build();
    }

    public static Function<Product, ProductResponse> getProductResponseHandler(){
        return (product -> new ProductResponse(
                product.getId(),
                product.getStock(),
                product.getRating(),
                product.getCategory(),
                product.getName(),
                product.getUrl(),
                product.getPrice(),
                product.getDescription(),
                product.getCreatedAt().toString()));
    }

    public static String getProductUrl(MultipartFile productFile, Product product, AmazonS3 amazonS3, AwsConfigProperties awsConfigProperties){
        File file = FileHandlerUtils.convertMultiPartFileToFile(productFile);
      String fileName = product.getName().toLowerCase() +"_"+productFile.getOriginalFilename();
      amazonS3.putObject(new PutObjectRequest(awsConfigProperties.bucketName(),fileName,file));
      return awsConfigProperties.bucketUrlEndpoint()+fileName;
    }

}
