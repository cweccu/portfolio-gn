function createActivity() {
	fetch("/data/activity.json")
		.then(res => res.json())
		.then(json => {
			const months = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"];
			const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
			const host = document.getElementById("activity-host");
			const temp = document.getElementById("activity-template").content;
			let month = 0;
			let scroll = 0;
			let content = null;
			for (const item of json) {
				// parse date string as number and construct a date object
				const dateStr = item.date.split("_");
				const mon = parseInt(dateStr[0]);
				const day = parseInt(dateStr[1]);
				const date = new Date(2024, mon - 1, day);

				if (month != mon) {
					// create an h3 for each new month parsed
					content = document.createElement("div");
					const monthStr = months[date.getMonth()]; // name of month
					const monthH3 = document.createElement("h3");
					monthH3.innerText = monthStr;
					content.appendChild(monthH3);
					month = mon;
				}
				
				// place name of day and date in respective element
				const dayStr = weeks[date.getDay()]; // name of day
				const node = temp.cloneNode(true);
				const dayStrEl = node.querySelector(".activity-day-text");
				dayStrEl.innerText = dayStr;
				const dayEl = node.querySelector(".activity-day");
				dayEl.innerText = day;
				
				// create element for each activity processed
				const itemHost = node.querySelector(".activity-item-host");
				for (const act of item.activities) {
					const div = document.createElement("div");
					div.className = "activity-item";
					itemHost.appendChild(div);
					const p = document.createElement("p");
					p.innerText = act;
					div.appendChild(p);
				}
				
				// check date for equality with today and
				// class content element as "today"
				// set scroll to position of current month
				const today = new Date();
				if (today.getMonth() == date.getMonth()) {
					scroll = host.scrollHeight + 18;
					if (today.getFullYear() == date.getFullYear() &&
						today.getDate() == date.getDate()) {
						content.className += " activity-today";
					}
				}
				content.appendChild(node);
				host.appendChild(content);
			}
			host.scrollTop = scroll; // scroll host
		});
}

createActivity();