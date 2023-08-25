import AppleHealthKit, { HealthInputOptions, HealthKitPermissions } from 'react-native-health';
import { useEffect, useState } from 'react';

const permissions: HealthKitPermissions = {
    permissions: {
        read: [
            AppleHealthKit.Constants.Permissions.Steps,
            AppleHealthKit.Constants.Permissions.FlightsClimbed,
            AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
        ],
        write: [],
    }
}

const useHealthData = (date: Date) => {
    const [hasPermissons, setHasPermissions] = useState(false);
    const [stpes, setSteps] = useState(0);
    const [flights, setFlights] = useState(0);
    const [distance, setDistance] = useState(0);

    useEffect(() => {
        AppleHealthKit.initHealthKit(permissions, (err) => {
            if (err) {
                console.log("error permissions")
                return;
            }
            setHasPermissions(true);
        })
    }, [])

    useEffect(() => {
        if (!hasPermissons) {
            return;
        }

        const option: HealthInputOptions = {
            date: date.toISOString(),
            includeManuallyAdded: false
        }

        AppleHealthKit.getStepCount(option, (err, results) => {
            if (err) {
                console.log("error steps")
                return;
            }
            // console.log("results ---> ", results.value)
            setSteps(results.value);
        })

        AppleHealthKit.getFlightsClimbed(option, (err, results) => {
            if (err) {
                console.log("error flights climbed")
                return;
            }
            setFlights(results.value)
        })

        AppleHealthKit.getDistanceWalkingRunning(option, (err, results) => {
            if (err) {
                console.log("error distance")
                return;
            }
            setDistance(results.value)
        })
    }, [hasPermissons])

    return {
        stpes, flights, distance
    }
}

export default useHealthData;