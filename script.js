let map, ipInput, longitude, latitude;
const searchBtn = document.getElementById("input-arrow");
const ipPara = document.getElementById("ip-para");
const locPara = document.getElementById("loc-para");
const timePara = document.getElementById("time-para");
const ispPara = document.getElementById("isp-para");

// Initialize the map when the script loads
document.addEventListener("DOMContentLoaded", () => {
	initiateMap();
});

const getIPval = () => {
	ipInput = document.getElementById("ip-input").value;
};

searchBtn.addEventListener("click", () => {
	fetchIpData(ipInput);
});

// IP address tracking using fetchAPI 
const fetchIpData = async (ip) => {
	const response = await fetch(
		`https://api.ipgeolocation.io/ipgeo?apiKey=1619d8a8cb574e5a920fbfc5cbf1e2cb&ip=${ip}`
	);
	const data = await response.json();
	ipPara.innerHTML = `${data.ip}`;
	locPara.innerHTML = `${data.city} ${data.district}, ${data.state_prov}, ${data.country_name}`;
	timePara.innerHTML = `UTC ${data.time_zone.offset}:00`;
	ispPara.innerHTML = `${data.isp}`;
	longitude = data.longitude;
	latitude = data.latitude;

	// Update the map with new coordinates
	updateMap(latitude, longitude);
};

// Initialize the map with default or fetched coordinates
const initiateMap = (lati, long) => {
	const lat = lati ? +lati : 37.4224;
	const lng = long ? +long : -122.08421;

	map = L.map("map").setView([lat, lng], 13);
	L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
		maxZoom: 19,
		attribution:
			'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	}).addTo(map);

	// Adding my custom icon as marker
	const myIcon = L.icon({
		iconUrl: "./images/icon-location.svg",
		iconSize: [36, 46],
		iconAnchor: [22, 94],
		popupAnchor: [-3, -76],
		shadowAnchor: [22, 94],
	});

	// Add a marker with the current coordinates
	L.marker([lat, lng], { icon: myIcon }).addTo(map);
};

const updateMap = (newLatitude, newLongitude) => {
	if (map) {
		map.remove();
	}

	initiateMap(newLatitude, newLongitude);
};
