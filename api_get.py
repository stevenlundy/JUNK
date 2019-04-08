#!/usr/bin/env python
# coding: utf-8

"""
This script downloads your Social Bicycles (SoBi) routes data from the SoBi web
API and saves it as a JSON file. It uses HTTP basic authentication with your SoBi
username (your email address) and password.

The function that requests route data executes recursively, incrementing the page
parameter with each subsequent request, until there are no more results.

For each route, the script also makes subsequent HTTP requests to the API to look
up the name of the bike you used, matching on the bike_id, and the address of the
hubs where you started and ended your trip (unless you started and/or ended outside
a hub).

The script saves bike names and hub addresses locally after requesting them, so if
a subsequent route uses the same bike_id or hub_id, it is populated from the cache
instead of generating another request to the API.

Finally, the script sums the total distance you travelled, in miles, and calculates
the equivalent distance in kilometres.

The script saves the results in JSON format to a local file. It saves the data
after each route, so that even if it fails for some reason, you will still save
whatever has downloaded so far.
"""

import json
import requests

# API uses both OAuth and HTTP basic auth
# We're going to go with the non-hair-pulling option
username = 'steven.lundy@gmail.com'
password = 'password'
auth = requests.auth.HTTPBasicAuth(username, password)

# path to save the local file
path = '/Users/stevel/Developer/JUMP/file.json'

routes_url = 'https://app.socialbicycles.com/api/routes.json'
hub_url = 'https://app.socialbicycles.com/api/hubs/%s.json'
bike_url = 'https://app.socialbicycles.com/api/bikes/%s.json'
bikes_url = 'https://app.socialbicycles.com/api/bikes.json'
network_bikes_url = 'https://app.socialbicycles.com/api/networks/%s/bikes.json'

data = { 'routes': [], 'bikes': [], 'hubs': [], 'total_distance': 0, 'total_distance_km': 0 }

def get_data(page=1):
    """Main function to fetch the data from the API"""
    thisurl = '%s?page=%s' % (routes_url, page)
    print('Requesting %s...' % (thisurl))
    response = requests.get(thisurl, auth=auth)
    print('Response code: %s' % (response.status_code))
    if response.status_code == 200:
        routes_obj = response.json()
        items = routes_obj['items']
        if not items:
            print('There are no more routes to save.')
        else:
            print('There %s %s route%s in this page.' % (
                len(items),
                'is' if len(items) == 1 else 'are',
                '' if len(items) == 1 else 's',
                )
            )
            for item in items:
                template = {
                    'distance': item['distance'], # distance is miles
                    'from_hub_id': item['started_inside_hub_id'],
                    'from_hub_address': lookup_hub_address(item['started_inside_hub_id']),
                    'to_hub_id': item['finished_inside_hub_id'],
                    'to_hub_address': lookup_hub_address(item['finished_inside_hub_id']),
                    'start_time': item['start_time'],
                    'finish_time': item['finish_time'],
                    'first_location_address': item['first_location_address'],
                    'bike_id': item['bike_id'],
                    'bike_name': lookup_bike_name(item['bike_id']),
                }

                # add this route to the list of routes
                data['routes'].append(template)

                save_data()

            # now call get_data() again with the next page. Yay recursion!
            page = routes_obj['current_page'] + 1
            get_data(page=page)

    # now calculate the total distance
    data['total_distance'] = sum_distance(data['routes'])

    # and total distance in kilometres
    data['total_distance_km'] = convert_miles_to_km(data['total_distance'])

    # save the data again
    save_data()

    print('All done.')

def get_all_bikes(page=1):
    this_network_bikes_url = network_bikes_url % 155
    thisurl = '%s?page=%s' % (this_network_bikes_url, page)
    print('Requesting %s...' % (thisurl))
    response = requests.get(thisurl, auth=auth, params={'network_id': 155})
    print('Response code: %s' % (response.status_code))
    if response.status_code == 200:
        bikes = response.json()
        print bikes
        page = bikes['current_page'] + 1
        get_all_bikes(page=page)

def to_float(val):
    """Tries to convert a string into a number"""
    try:
        return float(val)
    except ValueError:
        return 0

def distance(route):
    return to_float(route["distance"])

def save_data():
    """Saves the data dict as a JSON file"""
    with open(path, 'w') as myfile:
        myfile.write(json.dumps(data))

def sum_distance(routes):
    """Sums all the distances in a list of routes"""
    return round(sum(distance(route) for route in routes), 2)

def convert_miles_to_km(miles):
    """Converts miles to kilometres"""
    return round(miles * 1.60934, 2)

def lookup_bike_name(bike_id):
    """Returns the bike name for a bike id. First checks to see if bike name is saved locally in data['bikes'], then looks it up from the web API and saves result locally for future reference."""
    if not bike_id: # just in case it has a None value
        return ''
    bike_name = '' # initialize
    bike_match = [bike['bike_name'] for bike in data['bikes'] if bike['bike_id'] == bike_id]
    if len(bike_match) == 0:
        this_bike_url = bike_url % (bike_id)
        print('Requesting %s...' % (this_bike_url))
        response = requests.get(this_bike_url, auth=auth)
        print('Response code: %s' % (response.status_code))
        if response.status_code == 200:
            bike_obj = response.json()
            bike_name = bike_obj['name']
            print('API response: bike_id %s has name %s.' % (bike_id, bike_name))
            data['bikes'].append({'bike_id': bike_id, 'bike_name': bike_name})
            print("Bike added to data['bikes'].")
        else: # some other status code
            print('API returned HTTP status code %s.' % (response.status_code))
    else: # bike has been looked up
        print("Bike name found in data['bikes']")
        bike_name = bike_match[0]
    return bike_name

def lookup_hub_address(hub_id):
    """Returns the hub address for a hub id. First checks to see if hub address is saved locally in data['hubs'], then looks it up from the web API and saves result locally for future reference."""
    if not hub_id: # don't try to look up the hub address if route terminus was outside a hub
        return ''
    hub_address = '' # initialize
    hub_match = [hub['hub_address'] for hub in data['hubs'] if hub['hub_id'] == hub_id]
    if len(hub_match) == 0:
        this_hub_url = hub_url % (hub_id)
        print('Requesting %s...' % (this_hub_url))
        response = requests.get(this_hub_url, auth=auth)
        print('Response code: %s' % (response.status_code))
        if response.status_code == 200:
            hub_obj = response.json()
            hub_address = hub_obj['address']
            print('API response: hub_id %s has address %s.' % (hub_id, hub_address))
            data['hubs'].append({'hub_id': hub_id, 'hub_address': hub_address})
            print("Hub added to data['hubs'].")
        else: # some other status code
            print('API returned HTTP status code %s.' % (response.status_code))
    else: # hub has been looked up
        print("Hub address found in data['hubs']")
        hub_address = hub_match[0]
    return hub_address

if __name__ == '__main__':
    get_all_bikes()

