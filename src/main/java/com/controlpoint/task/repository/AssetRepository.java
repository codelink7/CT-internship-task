package com.controlpoint.task.repository;

import com.controlpoint.task.model.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SensorReadingRepository extends JpaRepository<SensorReading, Long> {
    Optional<SensorReading> findTopByAssetIdOrderByTimestampDesc(Long assetId);
}