document.addEventListener('DOMContentLoaded', function () {
    const areaSlider = document.getElementById('area');
    const areaValue = document.getElementById('area-value');
    const resultAmount = document.getElementById('result-amount');
    const resultDetails = document.getElementById('result-details');
    const serviceCheckboxes = document.querySelectorAll('.service-checkbox input');
    const serviceHeaders = document.querySelectorAll('.service-header');

    // Раскрытие подробностей услуги
    serviceHeaders.forEach((header) => {
        header.addEventListener('click', function () {
            const description = this.nextElementSibling;
            if (description.style.display === 'block') {
                description.style.display = 'none';
            } else {
                description.style.display = 'block';
            }
        });
    });

    // Функция для расчёта общей суммы
    function updateCalculation() {
        const area = parseInt(areaSlider.value);
        let totalCost = 0;
        let detailsText = '';

        serviceCheckboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                const price = parseInt(checkbox.dataset.price);
                const min = parseInt(checkbox.dataset.min);
                const unit = checkbox.dataset.unit;
                const serviceName = checkbox.closest('.service-item').querySelector('.service-title').textContent;

                let serviceCost;
                if (unit === 'фикс') {
                    serviceCost = min;
                    detailsText += `${serviceName}: ${formatNumber(serviceCost)} руб.<br>`;
                } else {
                    serviceCost = price * area;
                    if (serviceCost < min) {
                        serviceCost = min;
                    }
                    const unitText = unit === 'сотка' ? 'соток' : 'м²';
                    detailsText += `${serviceName}: ${formatNumber(serviceCost)} руб. (${price} руб/${unit} × ${area} ${unitText})<br>`;
                }

                totalCost += serviceCost;
            }
        });

        if (totalCost === 0) {
            resultAmount.textContent = '0 руб.';
            resultDetails.innerHTML = 'Выберите услуги для расчета стоимости';
        } else {
            const formattedCost = formatNumber(totalCost);
            resultAmount.textContent = `${formattedCost} руб.`;
            resultDetails.innerHTML = detailsText;
        }
    }

    // Функция для красивого форматирования числа с пробелами
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    // Обработка события ползунка
    areaSlider.addEventListener('input', function () {
        const area = parseInt(this.value);
        areaValue.textContent = `${area} м²`;
        updateCalculation();
    });

    // Обработка выбора чекбоксов
    serviceCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', updateCalculation);
    });

    // Первоначальная инициализация калькулятора
    updateCalculation();
});