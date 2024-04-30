window.onload = () => {
    if (sessionStorage.getItem('user') === undefined || sessionStorage.getItem('user') === null) {
        location.href = '/login'
    }
    if(sessionStorage.getItem('patient_code') == null) location.href = '/'
    else {
        const titletext = document.querySelector('.titletext')
        titletext.innerHTML += `${sessionStorage.getItem('first_name')} ${sessionStorage.getItem('last_name')}`
    }
}

const submit_therapy = document.querySelector('#submit-therapy')

submit_therapy.addEventListener('click', () => {
    const patient_id = sessionStorage.getItem('patient_code')

    var date_radioligand = document.querySelector('#p2-dateradioligand').value
    if(date_radioligand.length > 9) {
        const temp_date_radioligand = new Date(date_radioligand);
        date_radioligand = [('0' + (temp_date_radioligand.getMonth() + 1)).slice(-2), ('0' + temp_date_radioligand.getDate()).slice(-2), 
            ('000' + temp_date_radioligand.getFullYear()).slice(-4)].join('/');
    }

    const meds = document.querySelector('#p2-medications').value
    const pre_meds = document.querySelector('#p2-premedications').value
    const p2_bp = document.querySelector('#p2-bp').value
    const p2_hr = document.querySelector('#p2-hr').value
    const p2_rr = document.querySelector('#p2-rr').value
    const oxygen_sat = document.querySelector('#p2-oxygen').value

    var date_therapy = document.querySelector('#p2-datetherapy').value
    if(date_therapy.length > 9) {
        const temp_date_therapy = new Date(date_therapy);
        date_therapy = [('0' + (temp_date_therapy.getMonth() + 1)).slice(-2), ('0' + temp_date_therapy.getDate()).slice(-2), 
            ('000' + temp_date_therapy.getFullYear()).slice(-4)].join('/');
    }

    const radiopharm = document.querySelector('#p2-radiopharm').value
    const activity = document.querySelector('#p2-activity').value
    const have_fatigue = document.querySelector('#p2-fatigue').checked
    const have_nausea_vomitting = document.querySelector('#p2-nausea').checked
    const have_dry_lipmouth = document.querySelector('#p2-dry').checked
    const have_headache = document.querySelector('#p2-headache').checked
    const have_bone_pain = document.querySelector('#p2-bonepain').checked
    const other_side_effect = document.querySelector('#p2-others').checked

    fetch('/request/add-patient/therapy', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
            patient_id: patient_id,
            date_radioligand: date_radioligand,
            meds: meds,
            pre_meds: pre_meds,
            p2_bp: p2_bp,
            p2_hr: p2_hr,
            p2_rr: p2_rr,
            oxygen_sat: oxygen_sat,
            date_therapy: date_therapy,
            radiopharm: radiopharm,
            activity: activity,
            have_fatigue: have_fatigue,
            have_nausea_vomitting: have_nausea_vomitting,
            have_dry_lipmouth: have_dry_lipmouth,
            have_headache: have_headache,
            have_bone_pain: have_bone_pain,
            other_side_effect: other_side_effect
        })
    })
    .then((res) => res.json())
    .then((data) => {
        if (data[0].event == 'success') {
            alert(`Therapy information for ${sessionStorage.getItem('first_name')} ${sessionStorage.getItem('last_name')} added successfully.`)
            location.href = '/view-patient'
        }
        else if (data[0].event == 'fill') {
            alert('Fill all fields')
        }
        else alert('Error occurred while adding therapy')
    })
})