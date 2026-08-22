package com.controlpoint.task.service;

import com.controlpoint.task.model.Asset;
import com.controlpoint.task.model.AssetStatus;
import com.controlpoint.task.model.SensorReading;
import com.controlpoint.task.repository.AssetRepository;
import com.controlpoint.task.repository.SensorReadingRepository;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;

import java.util.List;
import java.util.Optional;

@Service // Tells Spring this is our business logic layer
public class AssetService {

    private final AssetRepository assetRepository;
    private final SensorReadingRepository sensorRepository;

    // Constructor Injection: Spring automatically provides the repositories
    public AssetService(AssetRepository assetRepository, SensorReadingRepository sensorRepository) {
        this.assetRepository = assetRepository;
        this.sensorRepository = sensorRepository;
    }

    // --- API Logic ---

    public List<Asset> getAllAssets() {
        return assetRepository.findAll();
    }

    public Optional<Asset> getAssetById(Long id) {
        return assetRepository.findById(id);
    }

    public Asset createAsset(Asset asset) {
        return assetRepository.save(asset);
    }

    public Optional<SensorReading> getLatestSensorReading(Long assetId) {
        return sensorRepository.findTopByAssetIdOrderByTimestampDesc(assetId);
    }

    // --- Startup Logic ---

    @PostConstruct // This runs automatically right after the app starts
    public void preloadData() {
        if (assetRepository.count() == 0) {
            Asset pump = new Asset(null, "Main Pump", "Pump", AssetStatus.RUNNING);
            Asset motor = new Asset(null, "Conveyor Motor", "Motor", AssetStatus.STOPPED);
            assetRepository.saveAll(List.of(pump, motor));
            System.out.println("Sample assets preloaded!");
        }
    }
}