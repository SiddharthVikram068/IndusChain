import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, FlatList } from 'react-native';
import { Link } from 'expo-router';

const ProductSteps = () => {
  // Hardcoded product data
  const product = {
    productId: 1,
    productName: 'Coffee Beans',
    companyName: 'Coffee Co.',
    manufacturer: 'Manufacturer A',
    currentOwner: 'Retailer B',
    creationTimestamp: '2024-09-30 08:00:00',
    steps: [
      {
        status: 'Harvested',
        location: 'Farm A',
        stakeholder: 'Farmer John',
        timestamp: '2024-10-01 10:00:00',
      },
      {
        status: 'Processed',
        location: 'Processing Plant B',
        stakeholder: 'Processor Mike',
        timestamp: '2024-10-02 14:00:00',
      },
      {
        status: 'Packaged',
        location: 'Factory C',
        stakeholder: 'Packager Sarah',
        timestamp: '2024-10-03 08:30:00',
      },
      {
        status: 'Shipped',
        location: 'Distribution Center D',
        stakeholder: 'Distributor Tom',
        timestamp: '2024-10-04 16:00:00',
      },
    ],
  };

  const animatedValues = useRef(Array(10).fill(0).map(() => new Animated.Value(0))).current;
  const carPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start animation for completed checkpoints
    Animated.loop(
      Animated.stagger(300, [
        ...animatedValues.map((val, index) =>
          Animated.timing(val, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
            delay: index * 500, // staggered animation for each checkpoint
          })
        ),
      ])
    ).start();

    // Animate car moving through checkpoints
    Animated.loop(
      Animated.sequence([
        Animated.timing(carPosition, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: false,
        }),
        Animated.timing(carPosition, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [animatedValues, carPosition]);

  const renderCheckpoint = (index) => {
    const animatedStyle = {
      opacity: animatedValues[index].interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 1], // Fade effect for highlighting
      }),
      transform: [
        {
          scale: animatedValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.2], // Slight pulse effect
          }),
        },
      ],
    };

    return (
      <Animated.View
        key={index}
        style={[
          styles.checkpoint,
          animatedStyle,
          { backgroundColor: product.steps[index] ? '#28a745' : '#ccc' }, // Green for completed, gray for not
        ]}
      >
        <Text style={styles.checkpointText}>{index + 1}</Text>
      </Animated.View>
    );
  };

  const carTranslateX = carPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 320], // Adjust this value based on your layout
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Details: {product.productName}</Text>
      <Text style={styles.subtitle}>Company: {product.companyName}</Text>
      <Text style={styles.subtitle}>Manufacturer: {product.manufacturer}</Text>
      <Text style={styles.subtitle}>Current Owner: {product.currentOwner}</Text>
      <Text style={styles.subtitle}>Creation Timestamp: {product.creationTimestamp}</Text>

      <View style={styles.roadContainer}>
        {Array.from({ length: 10 }).map((_, index) => renderCheckpoint(index))}
        <Animated.View style={[styles.car, { transform: [{ translateX: carTranslateX }] }]}>
          <Text style={styles.carText}>🚗</Text>
        </Animated.View>
      </View>

      <View style={styles.tableContainer}>
        <Text style={styles.tableTitle}>Product Steps</Text>
        <FlatList
          data={product.steps}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.status}</Text>
              <Text style={styles.tableCell}>{item.location}</Text>
              <Text style={styles.tableCell}>{item.stakeholder}</Text>
              <Text style={styles.tableCell}>{item.timestamp}</Text>
            </View>
          )}
        />
      </View>

      <Link href="/form" style={styles.link}>
        <Text style={styles.linkText}>Go to Form</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FAFAFA',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  roadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    position: 'relative', // This will help in positioning the car over the road
  },
  checkpoint: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#007BFF',
  },
  checkpointText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  car: {
    position: 'absolute', // Position the car absolutely within the road container
    bottom: 20, // Adjust based on your layout
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carText: {
    fontSize: 30,
  },
  tableContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: '#f1f1f1',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    color: '#333',
  },
  link: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#28a745',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  linkText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProductSteps;
