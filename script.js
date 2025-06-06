document.addEventListener('DOMContentLoaded', () => {
    const qrText = document.getElementById('qrText');
    const sizeInput = document.getElementById('size');
    const bgColorInput = document.getElementById('bgColor');
    const fgColorInput = document.getElementById('fgColor');
    const generateBtn = document.getElementById('generateBtn');
    const qrCanvas = document.getElementById('qrCanvas');
    const qrMessage = document.getElementById('qrMessage');
    const downloadBtn = document.getElementById('downloadBtn');

    // Initialize QRious
    const qr = new QRious({
        element: qrCanvas,
        value: 'Hello World!', // Default value
        size: 250,
        background: 'white',
        foreground: 'black'
    });

    // --- Event Listeners ---
    generateBtn.addEventListener('click', generateQrCode);
    qrText.addEventListener('input', generateQrCode); // Live update
    sizeInput.addEventListener('input', generateQrCode); // Live update
    bgColorInput.addEventListener('input', generateQrCode); // Live update
    fgColorInput.addEventListener('input', generateQrCode); // Live update
    downloadBtn.addEventListener('click', downloadQrCode);

    // --- Functions ---

    function generateQrCode() {
        const text = qrText.value.trim();
        const size = parseInt(sizeInput.value);
        const bgColor = bgColorInput.value;
        const fgColor = fgColorInput.value;

        if (!text) {
            qrMessage.textContent = "Please enter some text or URL.";
            qrCanvas.style.display = 'none';
            downloadBtn.style.display = 'none';
            return;
        }

        if (isNaN(size) || size < 50 || size > 1000) {
            qrMessage.textContent = "Size must be between 50 and 1000 pixels.";
            qrCanvas.style.display = 'none';
            downloadBtn.style.display = 'none';
            return;
        }

        qrMessage.textContent = ""; // Clear any previous messages
        qrCanvas.style.display = 'block'; // Show canvas

        qr.set({
            value: text,
            size: size,
            background: bgColor,
            foreground: fgColor
        });
        downloadBtn.style.display = 'block'; // Show download button
    }

    function downloadQrCode() {
        if (!qrText.value.trim()) {
            alert("Please generate a QR code first!");
            return;
        }
        
        // Create a temporary link element
        const link = document.createElement('a');
        link.download = 'qrcode.png'; // Default filename
        link.href = qrCanvas.toDataURL('image/png'); // Get image data from canvas
        document.body.appendChild(link);
        link.click(); // Programmatically click the link to trigger download
        document.body.removeChild(link); // Clean up
    }

    // Generate QR code on initial load with default values
    generateQrCode();
});
