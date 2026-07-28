package com.daniel.market_app.service.impl;

import com.daniel.market_app.domain.House;
import com.daniel.market_app.domain.Product;
import com.daniel.market_app.dto.request.CreateProductRequest;
import com.daniel.market_app.dto.response.ProductItemResponse;
import com.daniel.market_app.dto.response.ProductResponse;
import com.daniel.market_app.exception.HouseNotFoundException;
import com.daniel.market_app.exception.ProductNotFoundException;
import com.daniel.market_app.repository.HouseRepository;
import com.daniel.market_app.repository.ProductRepository;
import com.daniel.market_app.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductServiceImpl implements ProductService {

	private final ProductRepository productRepository;
	private final HouseRepository houseRepository;

	@Override
	@Transactional
	public ProductResponse create(
			UUID houseId,
			CreateProductRequest request) {

		House house = getHouse(houseId);

		Product product = new Product();
		product.setHouse(house);
		product.setName(request.name());

		if (request.image() != null) {
			try {
				product.setImage(request.image().getBytes());
				product.setImageContentType(request.image().getContentType());
			} catch (IOException ex) {
				throw new IllegalStateException("Unable to read product image", ex);
			}
		}

		Product savedProduct = productRepository.save(product);

		return toResponse(savedProduct);
	}

	@Override
	public List<ProductItemResponse> findAllByHouseId(UUID houseId) {

		getHouse(houseId);

		return productRepository.findAllByHouseId(houseId)
				.stream()
				.map(product -> new ProductItemResponse(
						product.getId(),
						product.getName()
				))
				.toList();
	}

	@Override
	public ProductResponse findById(UUID houseId, UUID productId) {

		return toResponse(getProduct(houseId, productId));
	}

	@Override
	public byte[] getImage(UUID houseId, UUID productId) {

		return getProduct(houseId, productId).getImage();
	}

	@Override
	@Transactional
	public void delete(UUID houseId, UUID productId) {

		Product product = getProduct(houseId, productId);

		productRepository.delete(product);
	}

	private House getHouse(UUID houseId) {
		return houseRepository.findById(houseId)
				.orElseThrow(() -> new HouseNotFoundException(houseId));
	}

	private Product getProduct(UUID houseId, UUID productId) {
		return productRepository.findByIdAndHouseId(productId, houseId)
				.orElseThrow(() -> new ProductNotFoundException(productId));
	}

	private ProductResponse toResponse(Product product) {
		return new ProductResponse(
				product.getId(),
				product.getName(),
				product.getImage() == null
						? null
						: Base64.getEncoder().encodeToString(product.getImage())
		);
	}
}
