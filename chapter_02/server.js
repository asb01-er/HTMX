import express from 'express';
const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route
app.post('/calculate', (req, res) => {
    const height = parseFloat(req.body.height);
    const weight = parseFloat(req.body.weight);
    const bmi = weight / (height * height);

    let message = "";
    let alertClass = "";

    if (bmi < 18.5) {
        message = "You are underweight.";
        alertClass = "alert-warning";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        message = "You have a normal weight.";
        alertClass = "alert-success";
    } else if (bmi >= 25 && bmi < 29.9) {
        message = "You are overweight.";
        alertClass = "alert-warning";
    } else {
        message = "You are obese.";
        alertClass = "alert-danger";
    }

    res.send(`
        <div class="card border-0 shadow-sm text-white bg-success">
            <div class="card-body">
                <h5 class="card-title">Your BMI Result</h5>
                <p class="card-text">
                    Height: <strong>${height}m</strong><br>
                    Weight: <strong>${weight}Kg</strong><br>
                    BMI: <span class="badge bg-info text-dark">${bmi.toFixed(2)}</span>
                </p>
                <div class="alert ${alertClass} fw-bold mb-0">${message}</div>
            </div>
        </div>
    `);
});

// Start server
app.listen(3000, () => {
    console.log('Server listening on http://localhost:3000');
});
