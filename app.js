/*
 * CLINICAL SCORING LOGIC:
 * 30 Questions mapped to 6 Clinical Sub-dimensions.
 * Scale: 0-5 (0: Hiçbir zaman, 1: Çok nadir, 2: Bazen, 3: Sıklıkla, 4: Çoğu zaman, 5: Her zaman)
 * Max score per dimension: 25. Max total score: 150.
 */

const questions = [
    // DEPRESYON (DEP)
    { text: "Kendimi genel olarak çökkün, üzgün veya boşlukta hissediyorum.", category: "DEP" },
    { text: "Eskiden keyif aldığım şeylere karşı ilgimi tamamen kaybettim.", category: "DEP" },
    { text: "Geleceğe dair umutsuz hissediyor, hiçbir şeyin düzelmeyeceğini düşünüyorum.", category: "DEP" },
    { text: "Kendimi değersiz hissediyor veya geçmişte olanlar için kendimi suçluyorum.", category: "DEP" },
    { text: "Günlük işlerimi yapacak enerjiyi bulamıyor, sürekli bitkin hissediyorum.", category: "DEP" },
    
    // ANKSİYETE (ANX)
    { text: "Mantıklı bir sebebi olmaksızın yoğun bir korku veya endişe yaşıyorum.", category: "ANX" },
    { text: "Aniden ortaya çıkan panik, dehşet hissi veya aklımı kaçıracakmışım korkusu yaşıyorum.", category: "ANX" },
    { text: "Fiziksel bir efor sarf etmediğim halde kalbim hızla çarpıyor veya nefesim daralıyor.", category: "ANX" },
    { text: "Her an kötü bir haber alacakmışım veya sevdiklerime bir şey olacakmış gibi tetikteyim.", category: "ANX" },
    { text: "Bedensel olarak sürekli gerginim, kaslarımda kasılma veya titreme hissediyorum.", category: "ANX" },

    // OKB (Obsesif-Kompulsif Belirtiler)
    { text: "İstemediğim halde aklıma sürekli rahatsız edici takıntılı düşünceler veya imgeler geliyor.", category: "OKB" },
    { text: "Rahatlamak veya kötü bir şeyi engellemek için bazı eylemleri (yıkama, kontrol etme vb.) tekrar tekrar yapma ihtiyacı duyuyorum.", category: "OKB" },
    { text: "Eşyaların belirli bir simetride, düzende veya tam yerinde olmaması bana aşırı rahatsızlık veriyor.", category: "OKB" },
    { text: "Zihnimdeki belirli cümleleri, sayıları veya duaları içimden sürekli tekrarlama ihtiyacı hissediyorum.", category: "OKB" },
    { text: "Bir eylemi (örneğin kapıyı kilitlemeyi) doğru yaptığımdan emin olamıyor, defalarca teyit ediyorum.", category: "OKB" },

    // SOMATİZASYON (SOM)
    { text: "Tıbbi bir nedeni bulunamayan geçmeyen ağrılar (baş, sırt, eklem vb.) yaşıyorum.", category: "SOM" },
    { text: "Stresli olduğumda midemde veya bağırsaklarımda belirgin rahatsızlıklar oluşuyor.", category: "SOM" },
    { text: "Nedensiz yere baş dönmesi, göz kararması veya bayılacakmış gibi hissetme durumu yaşıyorum.", category: "SOM" },
    { text: "Bedenimde uyuşma, karıncalanma veya his kaybı gibi garip duyumlar fark ediyorum.", category: "SOM" },
    { text: "Doktorlar fiziksel olarak sağlıklı olduğumu söylese de bedenimde bir hastalık olduğundan endişeleniyorum.", category: "SOM" },

    // TÜKENMİŞLİK VE STRES (STR)
    { text: "İş, okul veya günlük sorumlulukların yükü altında tamamen ezildiğimi hissediyorum.", category: "STR" },
    { text: "İnsanların taleplerine veya çevresel seslere karşı aşırı tahammülsüz tepkiler veriyorum.", category: "STR" },
    { text: "Ne kadar dinlenirsem dinleneyim zihinsel olarak toparlanamıyorum.", category: "STR" },
    { text: "Dikkatimi toplamam gereken durumlarda odaklanamıyor, zihnimin bulandığını hissediyorum.", category: "STR" },
    { text: "Çevremde olup bitenlere karşı duygusal olarak uyuşmuş veya kayıtsız hissediyorum.", category: "STR" },

    // SOSYAL İZOLASYON (SOS)
    { text: "İnsanlarla iletişim kurmak çok zor veya yorucu geldiği için yalnız kalmayı tercih ediyorum.", category: "SOS" },
    { text: "Sosyal ortamlarda başkaları tarafından eleştirileceğim veya rezil olacağım korkusu yaşıyorum.", category: "SOS" },
    { text: "Evden çıkmak, yeni ortamlara girmek veya tanıdığım insanlarla bile görüşmek istemiyorum.", category: "SOS" },
    { text: "Duygularımı veya düşüncelerimi kimseyle paylaşmıyor, içime kapanıyorum.", category: "SOS" },
    { text: "Telefon çaldığında veya bir mesaj geldiğinde cevap vermek bana büyük bir yük gibi geliyor.", category: "SOS" }
];

const categoryLabels = {
    "DEP": "Depresif Belirtiler",
    "ANX": "Anksiyete (Kaygı)",
    "OKB": "Obsesif-Kompulsif Eğilimler",
    "SOM": "Somatizasyon (Bedensel Dışavurum)",
    "STR": "Tükenmişlik & Stres",
    "SOS": "Sosyal İzolasyon"
};

const likertOptions = [
    { value: 0, text: "Hiçbir zaman" },
    { value: 1, text: "Çok nadir" },
    { value: 2, text: "Bazen" },
    { value: 3, text: "Sıklıkla" },
    { value: 4, text: "Çoğu zaman" },
    { value: 5, text: "Neredeyse her zaman" }
];

let currentQuestionIndex = 0;
let userAnswers = new Array(questions.length).fill(null);

document.addEventListener('DOMContentLoaded', () => {
    const consentCheckbox = document.getElementById('kvkk-consent');
    if(consentCheckbox) {
        consentCheckbox.addEventListener('change', (e) => {
            document.getElementById('btn-start-test').disabled = !e.target.checked;
        });
    }
});

function navigateTo(viewId) {
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
        setTimeout(() => { view.style.display = 'none'; }, 400); 
    });
    
    setTimeout(() => {
        const nextView = document.getElementById(viewId);
        nextView.style.display = 'block';
        setTimeout(() => nextView.classList.add('active'), 50);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
}

function startTest() {
    currentQuestionIndex = 0;
    userAnswers.fill(null);
    renderQuestion();
    navigateTo('view-test');
}

function renderQuestion() {
    document.getElementById('question-counter').innerText = `Soru ${currentQuestionIndex + 1} / ${questions.length}`;
    const progressPercent = (currentQuestionIndex / questions.length) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercent}%`;

    document.getElementById('question-text').innerText = questions[currentQuestionIndex].text;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    likertOptions.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        if (userAnswers[currentQuestionIndex] === opt.value) btn.classList.add('selected');
        btn.innerText = opt.text;
        btn.onclick = () => selectOption(opt.value, btn);
        optionsContainer.appendChild(btn);
    });

    const prevBtn = document.getElementById('btn-prev');
    prevBtn.style.display = currentQuestionIndex > 0 ? 'inline-block' : 'none';
}

function selectOption(value, btnElement) {
    document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    btnElement.classList.add('selected');
    userAnswers[currentQuestionIndex] = value;

    setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            renderQuestion();
        } else {
            calculateResults();
        }
    }, 300);
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
}

function getSeverityColor(percentage) {
    if (percentage < 30) return "var(--color-low)";
    if (percentage < 60) return "var(--color-mild)";
    if (percentage < 80) return "var(--color-medium)";
    return "var(--color-high)";
}

function calculateResults() {
    document.getElementById('progress-bar').style.width = '100%';
    
    setTimeout(() => {
        // Alt boyut puanlarını hesapla
        const scores = { DEP: 0, ANX: 0, OKB: 0, SOM: 0, STR: 0, SOS: 0 };
        let totalScore = 0;

        userAnswers.forEach((ans, index) => {
            const cat = questions[index].category;
            scores[cat] += (ans || 0);
            totalScore += (ans || 0);
        });

        // Genel Değerlendirme Mantığı (Max 150)
        let riskCategory, explanation, suggestion, mainColor;
        const totalPercentage = (totalScore / 150) * 100;

        if (totalPercentage < 25) {
            riskCategory = "Olağan Belirti Düzeyi";
            explanation = "Klinik değerlendirme profilinizde belirgin bir psikopatolojik bulguya rastlanmamıştır. Psikolojik dayanıklılığınızın yüksek olduğu ve mevcut stresörlerle uyum içinde başa çıkabildiğiniz görülmektedir.";
            suggestion = "Mevcut psikolojik iyi oluş halinizi destekleyen rutinlerinize devam ediniz.";
            mainColor = "var(--color-low)";
        } else if (totalPercentage < 50) {
            riskCategory = "Klinik Eşik Altı Semptomatoloji";
            explanation = "Profillenen veriler, bazı alanlarda hafif-orta düzeyde psikolojik zorlanmalar yaşadığınızı göstermektedir. Bu bulgular klinik bir tanı düzeyinde olmasa da yaşam kalitenizi kısmî olarak etkileyebilecek potansiyele sahiptir.";
            suggestion = "Öz-bakım stratejilerinizi gözden geçirmeniz ve koruyucu ruh sağlığı bağlamında psikolojik danışmanlık almayı değerlendirmeniz faydalı olabilir.";
            mainColor = "var(--color-mild)";
        } else if (totalPercentage < 75) {
            riskCategory = "Belirgin Klinik Semptomatoloji";
            explanation = "Analiz sonuçları, ruhsal işlevselliğinizi ve günlük adaptasyonunuzu sekteye uğratan belirgin klinik belirti kümelerine işaret etmektedir. Bu yoğunluk, kişinin tek başına başa çıkmakta zorlanacağı bir psikolojik yükü temsil eder.";
            suggestion = "Kapsamlı bir psikiyatrik veya klinik psikolojik değerlendirmeden geçmeniz klinik açıdan güçlü bir öneridir.";
            mainColor = "var(--color-medium)";
        } else {
            riskCategory = "Yüksek Akut Risk Profili";
            explanation = "Envanter bulguları; kognitif, duygusal ve davranışsal işlevlerinizde ciddi düzeyde bir bozulma riskine işaret etmektedir. Çıkan profil, ivedilikle klinik müdahale gerektiren bir semptom yoğunluğunu yansıtmaktadır.";
            suggestion = "Vakit kaybetmeksizin profesyonel bir ruh sağlığı uzmanına başvurmanız elzemdir.";
            mainColor = "var(--color-high)";
        }

        // Ana DOM Güncellemeleri
        document.getElementById('result-risk').innerText = riskCategory;
        document.getElementById('result-risk').style.color = mainColor;
        document.getElementById('result-explanation').innerText = explanation;
        document.getElementById('result-suggestion').innerText = suggestion;

        const indicatorFill = document.getElementById('indicator-fill');
        indicatorFill.style.backgroundColor = mainColor;
        indicatorFill.style.width = '0%'; 
        setTimeout(() => { indicatorFill.style.width = `${totalPercentage}%`; }, 500);

        // Alt Boyut DOM Oluşturma
        const subScoresContainer = document.getElementById('sub-scores-container');
        subScoresContainer.innerHTML = ''; // Temizle

        Object.keys(scores).forEach((cat, index) => {
            const catScore = scores[cat];
            const catPercentage = (catScore / 25) * 100; // Her kategori maks 25 puan (5 soru * 5 puan)
            const barColor = getSeverityColor(catPercentage);

            const itemDiv = document.createElement('div');
            itemDiv.className = 'sub-score-item';
            
            itemDiv.innerHTML = `
                <div class="sub-score-header">
                    <span>${categoryLabels[cat]}</span>
                    <span style="color: ${barColor}; font-weight: bold;">%${Math.round(catPercentage)}</span>
                </div>
                <div class="sub-score-bar-bg">
                    <div class="sub-score-bar-fill" id="fill-${cat}" style="background-color: ${barColor};"></div>
                </div>
            `;
            subScoresContainer.appendChild(itemDiv);

            // Alt boyut animasyonlarını sırayla tetikle
            setTimeout(() => {
                document.getElementById(`fill-${cat}`).style.width = `${catPercentage}%`;
            }, 600 + (index * 150));
        });

        navigateTo('view-result');
    }, 500);
}

function resetTest() {
    document.getElementById('kvkk-consent').checked = false;
    document.getElementById('btn-start-test').disabled = true;
    navigateTo('view-landing');
}

function contactExpert() {
    const linkedInUrl = "https://www.linkedin.com/in/melda-girgin/"; 
    window.open(linkedInUrl, "_blank");
}
