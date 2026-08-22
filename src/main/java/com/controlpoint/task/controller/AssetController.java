package com.controlpoint.task.controller;

import com.controlpoint.task.model.Asset;
import com.controlpoint.task.model.SensorReading;
import com.controlpoint.task.service.AssetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assets")
@CrossOrigin(origins = "*") 
public class AssetController {

    private final AssetService assetService;

    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }

  // GET http://localhost:8080/api/assets
    @GetMapping
    public List<Asset> getAllAssets() {
        return assetService.getAllAssets();
    }

// GET http://localhost:8080/api/assets/1
    @GetMapping("/{id}")
    public ResponseEntity<Asset> getAssetById(@PathVariable Long id) {
        return assetService.getAssetById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

//POST http://localhost:8080/api/assets
    @PostMapping
    public Asset createAsset(@RequestBody Asset asset) {
        return assetService.createAsset(asset);
    }

   // GET http://localhost:8080/api/assets/1/latest-reading
    @GetMapping("/{id}/latest-reading")
    public ResponseEntity<SensorReading> getLatestSensorReading(@PathVariable Long id) {
        return assetService.getLatestSensorReading(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}