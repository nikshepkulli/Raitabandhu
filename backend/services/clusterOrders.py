#!/usr/bin/env python3
"""
Order Aggregation Engine using K-Means/DBSCAN
- Groups orders by geo-coordinates and delivery window
- Outputs clusters with total quantity and time slot
"""
import sys
import json
import numpy as np
from sklearn.cluster import KMeans, DBSCAN
from datetime import datetime

def cluster_orders(orders, method='kmeans', n_clusters=5, eps=0.05, min_samples=2):
    # Prepare features: [lat, lon, delivery_start_hour]
    features = []
    for order in orders:
        lat = order['location']['lat']
        lon = order['location']['lon']
        start_hour = datetime.fromisoformat(order['deliveryWindow']['start']).hour
        features.append([lat, lon, start_hour])
    X = np.array(features)

    if method == 'kmeans':
        model = KMeans(n_clusters=n_clusters)
        labels = model.fit_predict(X)
    elif method == 'dbscan':
        model = DBSCAN(eps=eps, min_samples=min_samples)
        labels = model.fit_predict(X)
    else:
        raise ValueError('Unknown clustering method')

    # Aggregate clusters
    clusters = {}
    for idx, label in enumerate(labels):
        if label == -1:
            continue  # Ignore noise
        if label not in clusters:
            clusters[label] = {
                'orders': [],
                'totalQuantity': 0,
                'timeSlot': None
            }
        clusters[label]['orders'].append(orders[idx])
        clusters[label]['totalQuantity'] += orders[idx]['quantityKg']
        if not clusters[label]['timeSlot']:
            clusters[label]['timeSlot'] = orders[idx]['deliveryWindow']
    return clusters

def main():
    try:
        if len(sys.argv) < 2:
            raise ValueError("No orders data provided")
        
        orders_json = sys.argv[1]
        orders = json.loads(orders_json)
        
        if not orders or not isinstance(orders, list):
            raise ValueError("Invalid orders data")
        
        clusters = cluster_orders(orders)
        print(json.dumps(clusters))
        
    except Exception as e:
        error_response = {"error": str(e)}
        print(json.dumps(error_response))
        sys.exit(1)

if __name__ == "__main__":
    main()
