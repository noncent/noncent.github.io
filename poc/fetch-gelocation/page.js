// load external js
function loadScript(url, callback) {
    var script = document.createElement('script');
    script.src = url;
    script.onload = callback;
    document.body.appendChild(script);
}
// Define Geolocation class
function Geolocation() {
    // Initialize properties
    this.progressTracking = null;
    this.elements = {
        latitude: document.getElementById("latitude"),
        longitude: document.getElementById("longitude"),
        country: document.getElementById("country"),
        state: document.getElementById("state"),
        city: document.getElementById("city"),
        zipCode: document.getElementById("zipcode"),
        zone: document.getElementById("zone"),
        ip: document.getElementById("ip"),
        displayName: document.getElementById("display_name"),
        progress: document.getElementById("progress"),
        innerProgress: document.getElementById("inner-progress"),
    };
    this.pleaseWait =
        '<div class="progress-bar progress-bar-animated progress-bar-striped bg-primary" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">Please wait...</div>';
}

// Method to show progress bar
Geolocation.prototype.showProgress = function (el) {
    if (el) {
        // Show progress bar
        this.elements.progress.style.display = "flex";
        // Increase progress bar width
        let currentStatus = parseInt(this.elements.innerProgress.style.width) + 10;
        this.elements.innerProgress.style.width = `${currentStatus}%`;
        console.log(currentStatus);
    } else {
        console.log("Setting progress off");
        // Hide progress bar
        this.elements.progress.style.display = "none";
    }
};

// Method to hide progress bar and clear interval
Geolocation.prototype.hideProgress = function () {
    // Hide progress bar
    this.showProgress(false);
    // Clear the interval
    clearInterval(this.progressTracking);
};

// Method to fetch user's current location
Geolocation.prototype.fetchLocation = function () {
    var self = this;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));
        // Populate address information
        Object.values(this.elements).forEach((element) => {
            if (
                element !== this.elements.progress &&
                element !== this.elements.innerProgress
            ) {
                element.innerHTML = self.pleaseWait;
            }
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
};

// Function to fetch IP address from api.ipify.org
Geolocation.prototype.fetchIp = function (url) {
    if (typeof url == 'undefined') {
        url = "https://api.ipify.org?format=json";
    }
    return fetch(url)
        .then(response => {
            return response.json();
        }).catch(error => {
            return this.fetchIp("https://ipinfo.io/json");
        });
}

// Method to callback function to display the user's location
Geolocation.prototype.showPosition = function (position) {
    // Start the interval
    this.progressTracking = setInterval(function () {
        self.showProgress(true);
    }, 400);
    // Set latitude and longitude
    this.elements.latitude.textContent = position.coords.latitude;
    this.elements.longitude.textContent = position.coords.longitude;
    var self = this;
    // Fetch user's location based on latitude and longitude using a reverse geocoding service
    fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
    )
        .then((response) => response.json())
        .then(function (data) {
            // Populate address information
            self.elements.country.textContent = data.address.country;
            self.elements.state.textContent = data.address.state;
            self.elements.city.textContent = data.address.city;
            self.elements.zipCode.textContent = data.address.postcode;
            self.elements.zone.textContent = data.address.zone ?? "Not available";
            self.elements.displayName.innerHTML = data.display_name;
            // Call createOpenMap with the address
            self.createOpenMap({
                address: data.display_name,
                lat: position.coords.latitude,
                lon: position.coords.longitude,
            });
        })
        .catch((error) => console.log("Error fetching location:", error))
        .finally(this.hideProgress.bind(this));
    // Fetch user's IP address using api.ipify.org as primary and ipinfo.io as fallback
    self.fetchIp()
        .then(data => {
            this.elements.ip.textContent = data.ip;
        })
        .catch(error => {
            this.elements.ip.textContent = "Not available";
            console.log("Error fetching IP address:", error);
        });
};

// Method to create OpenStreetMap
Geolocation.prototype.createOpenMap = function (data) {
    // Initialize the map
    var map = L.map("map").setView([0, 0], 13);
    // Add the OpenStreetMap tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(map);
    console.log(data);
    // var geocodeUrl = "https://nominatim.openstreetmap.org/search?format=json&q=" + encodeURIComponent(address);
    // var self = this;
    // fetch(geocodeUrl)
    //     .then(response => response.json())
    //     .then(function (data) {
    //         if (data.length > 0) {
    //             var latlng = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    //             map.setView(latlng, 13);
    //             L.marker(latlng).addTo(map);
    //         } else {
    //             console.error("No results found for the address:", address);
    //         }
    //     })
    //     .catch(error => console.error("Error geocoding address:", error));
    var latlng = [data.lat, data.lon];
    map.setView(latlng, 13);
    L.marker(latlng).addTo(map);
};

// load open map lib
loadScript('https://unpkg.com/leaflet/dist/leaflet.js');

// Create an instance of Geolocation
var geo = new Geolocation();

// Function to fetch location
function fetchLocation() {
    geo.fetchLocation();
}