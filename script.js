document.addEventListener('DOMContentLoaded', () => {
  const ktpForm = document.getElementById('ktpForm');
  const dataList = document.getElementById('dataList');

  // Pilih elemen navbar
  const navbar = document.querySelector('.nav');

  // Tambahkan event listener untuk mendeteksi scroll
  window.addEventListener('scroll', () => {
    // Jika halaman di-scroll lebih dari 50px
    if (window.scrollY > 0) {
      navbar.classList.add('scrolled');
    } else {
      // Kembali ke posisi awal
      navbar.classList.remove('scrolled');
    }
  });

  // Data KTP Management
  let ktpData = [];

  // Function to add new KTP data
  function addKTPData(noID, nama, jenisKelamin, tanggalLahir) {
    const newKTP = {
      noID,
      nama,
      jenisKelamin,
      tanggalLahir,
    };

    ktpData.push(newKTP);
    updateDataList();
  }

  // Function to update KTP data
  function updateKTPData(index, noID, nama, jenisKelamin, tanggalLahir) {
    ktpData[index] = {
      noID,
      nama,
      jenisKelamin,
      tanggalLahir,
    };
    updateDataList();
  }

  // Function to delete KTP data
  function deleteKTPData(index) {
    ktpData.splice(index, 1);
    updateDataList();
  }

  // Function to update the data list
  function updateDataList() {
    dataList.innerHTML = '';
    ktpData.forEach((ktp, index) => {
      const dataItem = document.createElement('div');
      dataItem.classList.add('data-item');
      dataItem.innerHTML = `
                <p>No ID: ${ktp.noID}</p>
                <p>Nama: ${ktp.nama}</p>
                <p>Jenis Kelamin: ${ktp.jenisKelamin}</p>
                <p>Tanggal Lahir: ${ktp.tanggalLahir}</p>
                <div class="actions">
                    <button class="edit-btn" onclick="editKTPData(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteKTPData(${index})">Hapus</button>
                </div>
            `;
      dataList.appendChild(dataItem);
    });
  }

  // Define editKTPData globally
  window.editKTPData = function (index) {
    const ktp = ktpData[index];
    const noID = prompt('Masukkan Nomor ID Baru:', ktp.noID);
    const nama = prompt('Masukkan Nama Baru:', ktp.nama);
    const jenisKelamin = prompt('Masukkan Jenis Kelamin Baru (L/P):', ktp.jenisKelamin);
    const tanggalLahir = prompt('Masukkan Tanggal Lahir Baru (YYYY-MM-DD):', ktp.tanggalLahir);

    if (noID && nama && jenisKelamin && tanggalLahir) {
      updateKTPData(index, noID, nama, jenisKelamin, tanggalLahir);
    }
  };

  // Define deleteKTPData globally
  window.deleteKTPData = function (index) {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      deleteKTPData(index);
    }
  };

  // Event listener for form submission
  ktpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const noID = document.getElementById('noID').value;
    const nama = document.getElementById('nama').value;
    const jenisKelamin = document.getElementById('jenisKelamin').value;
    const tanggalLahir = document.getElementById('tanggalLahir').value;

    addKTPData(noID, nama, jenisKelamin, tanggalLahir);
    ktpForm.reset();
  });
});

// Get alert elements
const customAlert = document.getElementById('custom-alert');
const alertMessage = document.getElementById('custom-alert-message');
const alertOkButton = document.getElementById('custom-alert-ok');
const alertCancelButton = document.getElementById('custom-alert-cancel');

// Function to show custom alert
function showCustomAlert(message, callback) {
  alertMessage.textContent = message;
  customAlert.classList.add('show');

  // Handle OK button
  alertOkButton.onclick = () => {
    customAlert.classList.remove('show');
    if (callback) callback(true); // Execute callback on OK
  };

  // Handle Cancel button
  alertCancelButton.onclick = () => {
    customAlert.classList.remove('show');
    if (callback) callback(false); // Execute callback on Cancel
  };
}

// Example: Integrating with Edit and Hapus buttons
document.querySelectorAll('.edit-btn').forEach((button) => {
  button.addEventListener('click', () => {
    showCustomAlert('Apakah Anda yakin ingin mengedit data ini?', (confirm) => {
      if (confirm) {
        // Logic for editing the KTP
        console.log('Data diedit.');
      }
    });
  });
});

document.querySelectorAll('.hapus-btn').forEach((button) => {
  button.addEventListener('click', () => {
    showCustomAlert('Apakah Anda yakin ingin menghapus data ini?', (confirm) => {
      if (confirm) {
        // Logic for deleting the KTP
        console.log('Data dihapus.');
      }
    });
  });
});
