import { useEffect } from "react";
import { useDriver } from "../../store/driver";
import { Card } from "antd";

function AllDrivers() {
  const { drivers, fetchDrivers } = useDriver((state) => ({
    drivers: state.drivers,
    fetchDrivers: state.fetchDrivers,
  }));
  
  useEffect(()=>{
    fetchDrivers()
  }, [])

  return (
    <div>
      {drivers.map((driver) => (
        <Card key={driver._id} className="mb-5" bordered={true}>
          <p><strong>Entry point:</strong> {driver.currentLocation}</p>

          <p><strong>Truck capacity:</strong> {driver.truckCapacity}</p>

          <p><strong>Truck volume:</strong> {driver.truckVolume}</p>
        </Card>
      ))}
    </div>
  );
}

export default AllDrivers;
