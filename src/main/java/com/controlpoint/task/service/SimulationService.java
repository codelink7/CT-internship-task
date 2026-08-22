package com.controlpoint.task.service;

import com.controlpoint.task.model.Asset;
import com.controlpoint.task.model.AssetStatus;
import com.controlpoint.task.model.SensorReading;
import com.controlpoint.task.repository.AssetRepository;
import com.controlpoint.task.repository.SensorReadingRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class SimulationService {

    private final AssetRepository assetRepository;
    private final SensorReadingRepository sensorRepository;
    private final Random random = new Random();

    public SimulationService(AssetRepository assetRepository, SensorReadingRepository sensorRepository) {
        this.assetRepository = assetRepository;
        this.sensorRepository = sensorRepository;
    }

   
    @Scheduled(fixedRate = 5000)
    public void simulateSensorData() {
        List<Asset> assets = assetRepository.findAll(); 

        for (Asset asset : assets) {
        
            double randomTemp = 20.0 + (random.nextDouble() * 80.0); 
            double randomPressure = 1.0 + (random.nextDouble() * 9.0); 
            
           
            AssetStatus[] statuses = AssetStatus.values();
            AssetStatus randomStatus = statuses[random.nextInt(statuses.length)];
            
         
            asset.setStatus(randomStatus);
            assetRepository.save(asset);

          
            SensorReading reading = new SensorReading();
            reading.setAssetId(asset.getId());
            reading.setTemperature(randomTemp);
            reading.setPressure(randomPressure);
            reading.setTimestamp(LocalDateTime.now());
            
            sensorRepository.save(reading);
        }
        System.out.println("Simulation tick: Updated " + assets.size() + " assets.");
    }
}