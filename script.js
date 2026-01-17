// Vendor Registration
const form = document.getElementById("vendorForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const vendor = {
            name: document.getElementById("name").value,
            location: document.getElementById("location").value.toLowerCase(),
            category: document.getElementById("category").value.toLowerCase(),
            items: document.getElementById("items").value,
            time: document.getElementById("time").value,
            contact: document.getElementById("contact").value
        };

        let vendors = JSON.parse(localStorage.getItem("vendors")) || [];
        vendors.push(vendor);
        localStorage.setItem("vendors", JSON.stringify(vendors));

        alert("Vendor Registered Successfully!");
        form.reset();
    });
}

// Display Vendors
function displayVendors(vendors) {
    const list = document.getElementById("vendorList");
    list.innerHTML = "";

    if (vendors.length === 0) {
        list.innerHTML = "<p>No vendors found</p>";
        return;
    }

    vendors.forEach((v, index) => {
        const div = document.createElement("div");
        div.className = "vendor-card";
        div.innerHTML = `
            <h3>${v.name}</h3>
            <p><strong>Location:</strong> ${v.location}</p>
            <p><strong>Category:</strong> ${v.category}</p>
            <p><strong>Items:</strong> ${v.items}</p>
            <p><strong>Timings:</strong> ${v.time}</p>
            <p><strong>Contact:</strong> ${v.contact}</p>
            <button class="btn secondary" onclick="deleteVendor(${index})">Delete</button>
        `;
        list.appendChild(div);
    });
}

// Load vendors on vendors.html
if (document.getElementById("vendorList")) {
    const vendors = JSON.parse(localStorage.getItem("vendors")) || [];
    displayVendors(vendors);
}

// Filter Vendors
function filterVendors() {
    const location = document.getElementById("searchLocation").value.toLowerCase();
    const category = document.getElementById("searchCategory").value.toLowerCase();

    const vendors = JSON.parse(localStorage.getItem("vendors")) || [];

    const filtered = vendors.filter(v =>
        v.location.includes(location) &&
        v.category.includes(category)
    );

    displayVendors(filtered);
}

// Delete Vendor
function deleteVendor(index) {
    let vendors = JSON.parse(localStorage.getItem("vendors")) || [];
    vendors.splice(index, 1);
    localStorage.setItem("vendors", JSON.stringify(vendors));
    displayVendors(vendors);
}
