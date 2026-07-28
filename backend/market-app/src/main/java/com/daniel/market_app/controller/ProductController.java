package com.daniel.market_app.controller;

import com.daniel.market_app.dto.request.CreateProductRequest;
import com.daniel.market_app.dto.response.ProductResponse;
import com.daniel.market_app.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ProductController {

	private final ProductService productService;

	@PostMapping("/houses/{houseId}/products")
	public ResponseEntity<ProductResponse> createProduct(
			@PathVariable UUID houseId,
			@Valid @ModelAttribute CreateProductRequest request) {

		ProductResponse response = productService.create(houseId, request);

		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(response);
	}

	@GetMapping("/houses/{houseId}/products")
	public List<ProductResponse> getProducts(
			@PathVariable UUID houseId) {

		return productService.findAllByHouseId(houseId);
	}

	@GetMapping("/houses/{houseId}/products/{productId}")
	public ProductResponse getProduct(
			@PathVariable UUID houseId,
			@PathVariable UUID productId) {

		return productService.findById(houseId, productId);
	}

	@GetMapping("/houses/{houseId}/products/{productId}/image")
	public ResponseEntity<byte[]> getProductImage(
			@PathVariable UUID houseId,
			@PathVariable UUID productId) {

		byte[] image = productService.getImage(houseId, productId);

		return ResponseEntity.ok()
				.contentType(MediaType.APPLICATION_OCTET_STREAM)
				.body(image);
	}

	@DeleteMapping("/houses/{houseId}/products/{productId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteProduct(
			@PathVariable UUID houseId,
			@PathVariable UUID productId) {

		productService.delete(houseId, productId);
	}

}
