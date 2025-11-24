function toggleHeaderDrawer() {
	const drawer = document.getElementById("drawer");
	const state = drawer.classList.toggle("header-drawer-open");
	const toggle = document.querySelector(".header-drawer-toggle");
	toggle.style.mask = (state) ? "url(/images/icon/close.svg)" :
		"url(/images/icon/menu.svg)"; // change the toggle icon
		
	if (state) {
		// window listeners to close drawer when opened
		window.onscroll = (e) => toggleHeaderDrawer();
		window.onclick = (e) => {
			if (e.target.classList.contains("header-drawer-toggle")) { return; }
			toggleHeaderDrawer();
		}
	} else {
		// remove events listeners if drawer is closed
		window.onscroll = null;
		window.onclick = null;
	}
}

function toggleRoleDrawer() {
	// open all role drawers
	// all toggler are classed "on"
	document.querySelectorAll(".role-drawer")
	.forEach(d => d.classList.toggle("role-drawer-open"));
	document.querySelectorAll(".role-drawer-toggle")
	.forEach(t => t.classList.toggle("role-drawer-toggle-on"));
}
