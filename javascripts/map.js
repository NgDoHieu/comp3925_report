(function () {
    var regionMeta = {
        AME: {
            name: 'The Americas',
            summary: 'Important long-haul source market for Hong Kong arrivals.',
            visitors: '33,292,212',
            transport: 'Mostly by air',
            pattern: 'Mid-scale contribution'
        },
        EAFME: {
            name: 'Europe, Africa and the Middle East',
            summary: 'Combined long-haul markets grouped in the provided dataset.',
            visitors: '40,207,126',
            transport: 'Mostly by air',
            pattern: 'Stable long-haul source mix'
        },
        SouASIA: {
            name: 'South and Southeast Asia',
            summary: 'Second-largest source block in your provided totals.',
            visitors: '69,392,794',
            transport: 'Air and short-haul links',
            pattern: 'High and consistent contribution'
        },
        NorASIA: {
            name: 'North Asia',
            summary: 'Major nearby source region in the dataset.',
            visitors: '44,523,842',
            transport: 'Air dominant, some land/sea',
            pattern: 'Strong regional travel demand'
        },
        AUS: {
            name: 'Australia and South Pacific',
            summary: 'Smaller but steady long-haul contributor.',
            visitors: '13,067,916',
            transport: 'Mostly by air',
            pattern: 'Lower-volume stable inflow'
        },
        CHI: {
            name: 'Chinese Mainland',
            summary: 'Largest source market by a substantial margin.',
            visitors: '825,683,728',
            transport: 'Air, land, and sea',
            pattern: 'Dominant total contribution'
        },
        TAI: {
            name: 'Taiwan',
            summary: 'Consistent nearby market in the source-region mix.',
            visitors: '36,924,856',
            transport: 'Mostly by air',
            pattern: 'Steady medium-high contribution'
        },
        MAC: {
            name: 'Macao/Not identified',
            summary: 'Combined Macao and not-identified source entries from the table.',
            visitors: '20,937,240',
            transport: 'Land and sea significant',
            pattern: 'Cross-boundary short-trip profile'
        }
    };

    var map = document.querySelector('.world-map');
    if (!map) {
        return;
    }

    var mapCard = document.querySelector('.world-map-card');
    var mapTooltip = document.getElementById('map-tooltip');
    var regionName = document.getElementById('region-name');
    var regionSummary = document.getElementById('region-summary');
    var regionVisitors = document.getElementById('region-visitors');
    var regionTransport = document.getElementById('region-transport');
    var regionPattern = document.getElementById('region-pattern');
    var regions = Array.prototype.slice.call(map.querySelectorAll('.map-region'));

    function setRegion(code) {
        var info = regionMeta[code];
        if (!info) {
            return;
        }

        regions.forEach(function (region) {
            region.classList.toggle('is-active', region.getAttribute('data-region') === code);
        });

        regionName.textContent = info.name;
        regionSummary.textContent = info.summary;
        regionVisitors.textContent = info.visitors;
        regionTransport.textContent = info.transport;
        regionPattern.textContent = info.pattern;
    }

    function hideTooltip() {
        if (!mapTooltip) {
            return;
        }

        mapTooltip.classList.remove('is-visible');
        mapTooltip.setAttribute('aria-hidden', 'true');
    }

    function showTooltip(event, code) {
        if (!mapTooltip || !mapCard) {
            return;
        }

        var info = regionMeta[code];
        if (!info) {
            return;
        }

        var rect = mapCard.getBoundingClientRect();
        var offsetX = event && typeof event.clientX === 'number' ? event.clientX - rect.left : 24;
        var offsetY = event && typeof event.clientY === 'number' ? event.clientY - rect.top : 24;

        mapTooltip.innerHTML = '<strong>' + info.name + '</strong><span>Sum of Num of visitors: ' + info.visitors + '</span>';
        mapTooltip.style.left = Math.min(Math.max(12, offsetX + 14), rect.width - 260) + 'px';
        mapTooltip.style.top = Math.min(Math.max(12, offsetY + 14), rect.height - 76) + 'px';
        mapTooltip.classList.add('is-visible');
        mapTooltip.setAttribute('aria-hidden', 'false');
    }

    regions.forEach(function (region) {
        var code = region.getAttribute('data-region');

        region.addEventListener('mouseenter', function (event) {
            setRegion(code);
            showTooltip(event, code);
        });

        region.addEventListener('mousemove', function (event) {
            showTooltip(event, code);
        });

        region.addEventListener('focus', function () {
            setRegion(code);
            showTooltip(null, code);
        });

        region.addEventListener('click', function (event) {
            setRegion(code);
            showTooltip(event, code);
        });

        region.addEventListener('mouseleave', function () {
            hideTooltip();
        });

        region.addEventListener('blur', function () {
            hideTooltip();
        });
    });

    setRegion('CHI');
})();