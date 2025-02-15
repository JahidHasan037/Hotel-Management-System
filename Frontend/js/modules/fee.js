// js/modules/fee.js
export function loadFeeModule(container) {
    let fees = JSON.parse(localStorage.getItem('fees')) || [];
    
    function renderFees() {
        const feeTable = document.getElementById('feeTable');
        feeTable.innerHTML = '';
        fees.forEach((fee, index) => {
            const row = `<tr>
                <td>${fee.student}</td>
                <td>${fee.amount}</td>
                <td>${fee.date}</td>
                <td>${fee.year}</td>
                <td>${fee.semester}</td>
                <td>
                  <button class="btn btn-sm btn-warning" data-index="${index}" onclick="editFee(event)">Edit</button>
                  <button class="btn btn-sm btn-danger" data-index="${index}" onclick="deleteFee(event)">Delete</button>
                </td>
              </tr>`;
            feeTable.innerHTML += row;
        });
    }
  
    function saveFees() {
        localStorage.setItem('fees', JSON.stringify(fees));
    }
  
    function addOrUpdateFee(e) {
        e.preventDefault();
        const index = document.getElementById('feeIndex').value;
        const student = document.getElementById('feeStudent').value;
        const amount = document.getElementById('feeAmount').value;
        const date = document.getElementById('feeDate').value;
        const year = document.getElementById('feeYear').value;
        const semester = document.getElementById('feeSemester').value;
        
        const feeObj = { student, amount, date, year, semester };
        index === "" ? fees.push(feeObj) : fees[index] = feeObj;
        saveFees();
        renderFees();
        document.getElementById('feeForm').reset();
        document.getElementById('feeIndex').value = '';
    }
  
    window.editFee = function(e) {
        const index = e.target.getAttribute('data-index');
        const fee = fees[index];
        document.getElementById('feeStudent').value = fee.student;
        document.getElementById('feeAmount').value = fee.amount;
        document.getElementById('feeDate').value = fee.date;
        document.getElementById('feeYear').value = fee.year;
        document.getElementById('feeSemester').value = fee.semester;
        document.getElementById('feeIndex').value = index;
    };
  
    window.deleteFee = function(e) {
        fees.splice(e.target.getAttribute('data-index'), 1);
        saveFees();
        renderFees();
    };