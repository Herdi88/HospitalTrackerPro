document.addEventListener("DOMContentLoaded", function () {
    const dataUrl = "https://raw.githubusercontent.com/Herdi88/HospitalTrackerPro/main/hospital_data.json";

    async function fetchData() {
        try {
            const response = await fetch(dataUrl);
            const data = await response.json();

            document.getElementById("today_appointments").textContent = data.today_appointments;
            document.getElementById("tomorrow_appointments").textContent = data.tomorrow_appointments;
            document.getElementById("handled_calls").textContent = data.handled_calls;
            document.getElementById("emergency_patients").textContent = data.emergency_patients;
            document.getElementById("admitted_patients").textContent = data.admitted_patients;
            document.getElementById("total_surgeries").textContent = data.total_todays_surgeries;
            document.getElementById("last_updated").textContent = `🗓 ${data.last_updated}`;

            populateList("surgery_list", data.todays_surgeries, item => `${item.name}: ${item.doctor}`);
            populateList("top_doctors_list", data.top_doctors_weekly, item => `${item.name}: ${item.count} مواعيد`);
            populateList("top_surgeons_list", data.top_surgeons_weekly, item => `${item.name}: ${item.count} عمليات`);
        } catch (error) {
            console.error("Error fetching data:", error);
            document.getElementById("last_updated").textContent = "❌ خطأ في تحميل البيانات";
        }
    }

    function populateList(elementId, dataArray, formatFunc) {
        const list = document.getElementById(elementId);
        list.innerHTML = "";
        dataArray.forEach(item => {
            const li = document.createElement("li");
            li.textContent = formatFunc(item);
            list.appendChild(li);
        });
    }

    document.getElementById("toggleSurgeryList").addEventListener("click", () => toggleList("surgery_list", "toggleSurgeryList", "🔼 إخفاء قائمة العمليات الجراحية", "🔽 عرض قائمة العمليات الجراحية"));
    document.getElementById("toggleTopDoctorsList").addEventListener("click", () => toggleList("top_doctors_list", "toggleTopDoctorsList", "🔼 إخفاء قائمة أفضل الأطباء", "🔽 عرض قائمة أفضل الأطباء حسب المواعید اسبوعیا"));
    document.getElementById("toggleTopSurgeonsList").addEventListener("click", () => toggleList("top_surgeons_list", "toggleTopSurgeonsList", "🔼 إخفاء قائمة أفضل الجراحين", "🔽 عرض قائمة أفضل الجراحين حسب عدد عملیات اسبوعیا"));

    function toggleList(listId, buttonId, hideText, showText) {
        const list = document.getElementById(listId);
        const button = document.getElementById(buttonId);
        list.classList.toggle("hidden");
        button.textContent = list.classList.contains("hidden") ? showText : hideText;
    }

    document.getElementById("refresh_data").addEventListener("click", fetchData);

    fetchData();
});
