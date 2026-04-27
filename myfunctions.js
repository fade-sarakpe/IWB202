
function toggleDetails(id) {
    var box = document.getElementById(id);
    if (box.style.display === "none" || box.style.display === "") {
        box.style.display = "block";
    } else {
        box.style.display = "none";
    }
}

// <!-- ======================== fadi ==================== -->
function showOrderForm() {
    var checkboxes = document.querySelectorAll(".meal-check");
    var anyChecked = false;
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            anyChecked = true;
            break;
        }
    }

    if (!anyChecked) {
        alert("يرجى اختيار وجبة واحدة على الأقل قبل المتابعة.");
        return;
    }

    var section = document.getElementById("order-form-section");
    section.style.display = "block";
    section.scrollIntoView({ behavior: "smooth" });
}


function validateName(val) {
    if (val === "") return true;

    val = val.trim();

    for (var i = 0; i < val.length; i++) {
        var char = val[i];

        if (char === " ") continue;
        var arabic = /[\u0600-\u06FF]/;

        if (!arabic.test(char)) {
            return false;
        }
    }

    return true;
}
function validateId(val) {
    if (val.length !== 11) return false;

    for (var i = 0; i < val.length; i++) {
        if (val[i] < '0' || val[i] > '9') {
            return false;
        }
    }

    var startCode = parseInt(val.substring(0, 2));

    if (startCode < 1 || startCode > 14) {
        return false;
    }

    return true;
}

function validateDate(val) {
    if (val === "") return true;

    var parts = val.split("-");
    if (parts.length !== 3) return false;

    var d = parseInt(parts[0]);
    var m = parseInt(parts[1]);
    var y = parseInt(parts[2]);

    if (isNaN(d) || isNaN(m) || isNaN(y)) return false;

    if (m < 1 || m > 12) return false;
    if (d < 1 || d > 31) return false;
    if (y < 1900 || y > 2100) return false;

    return true;
}

function validateMobile(val) {
    if (val === "") return true;

    if (val.length !== 10) return false;

    for (var i = 0; i < val.length; i++) {
        if (val[i] < '0' || val[i] > '9') {
            return false;
        }
    }

    if (val.substring(0, 2) !== "09") return false;

    var thirdDigit = val[2];

    var allowed = ['3', '4', '5', '6', '8', '9'];

    var isValid = false;
    for (var i = 0; i < allowed.length; i++) {
        if (thirdDigit === allowed[i]) {
            isValid = true;
            break;
        }
    }

    return isValid;
}

function validateEmail(val) {
    if (val === "") return true;

    var atIndex = val.indexOf("@");
    var dotIndex = val.lastIndexOf(".");

    if (atIndex === -1 || dotIndex === -1) return false;

    if (atIndex > dotIndex) return false;

    if (atIndex === 0 || dotIndex === val.length - 1) return false;

    return true;
}

function setError(fieldId, errId, hasError) {
    var field = document.getElementById(fieldId);
    var msg = document.getElementById(errId);
    if (hasError) {
        field.classList.add("error-field");
        msg.style.display = "block";
    } else {
        field.classList.remove("error-field");
        msg.style.display = "none";
    }
    return hasError;
}

function submitOrder() {
    var name = document.getElementById("full-name").value.trim();
    var natId = document.getElementById("national-id").value.trim();
    var bdate = document.getElementById("birth-date").value.trim();
    var mobile = document.getElementById("mobile").value.trim();
    var email = document.getElementById("email").value.trim();

    var hasError = false;

    hasError = setError("full-name", "err-name", !validateName(name)) || hasError;
    hasError = setError("national-id", "err-id", !validateId(natId)) || hasError;
    hasError = setError("birth-date", "err-date", !validateDate(bdate)) || hasError;
    hasError = setError("mobile", "err-mobile", !validateMobile(mobile)) || hasError;
    hasError = setError("email", "err-email", !validateEmail(email)) || hasError;

    if (hasError) return;

    var checkboxes = document.querySelectorAll(".meal-check:checked");
    var rows = "";
    var total = 0;

    for (var i = 0; i < checkboxes.length; i++) {
        var cb = checkboxes[i];
        var mname = cb.getAttribute("data-name");
        var price = parseInt(cb.getAttribute("data-price"), 10);
        total += price;
        rows += "<tr><td>" + (i + 1) + "</td><td>" + mname + "</td><td>" + price + " ل.س</td></tr>";
    }

    var tax = total * 0.05;
    var finalTotal = total - tax;

    var html = "";
    html += "<p class='form-text'><strong>الاسم:</strong> " + (name || "—") + "</p>";
    html += "<p class='form-text'><strong>الرقم الوطني:</strong> " + natId + "</p>";
    html += "<p class='form-text'><strong>تاريخ الولادة:</strong> " + (bdate || "—") + "</p>";
    html += "<p class='form-text'><strong>الموبايل:</strong> " + (mobile || "—") + "</p>";
    html += "<p class='form-text'><strong>البريد الإلكتروني:</strong> " + (email || "—") + "</p>";
    html += "<br>";
    html += "<table><tr><th>#</th><th>اسم الوجبة</th><th>السعر</th></tr>" + rows + "</table>";
    html += "<p class='summary-total form-text'>المجموع قبل الضريبة: " + total + " ل.س</p>";
    html += "<p class='summary-total form-text'>الضريبة (5%): " + tax.toFixed(0) + " ل.س</p>";
    html += "<p class='summary-total form-text' style='color:#ff7b00;'>المجموع النهائي بعد الحسم: " + finalTotal.toFixed(0) + " ل.س</p>";

    document.getElementById("summary-content").innerHTML = html;
    document.getElementById("summary-overlay").classList.add("active");
}

function closeSummary() {
    document.getElementById("summary-overlay").classList.remove("active");
}
// <!-- ======================== fadi ==================== -->
