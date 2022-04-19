#[no_mangle]
pub extern "C" fn add(a: f64 , b: f64 ) -> f64  {
    a + b
}

#[no_mangle]
pub extern "C" fn sub(a: f64 , b: f64 ) -> f64  {
    a - b
}

#[no_mangle]
pub extern "C" fn mul(a: f64 , b: f64 ) -> f64  {
    a * b
}

#[no_mangle]
pub extern "C" fn div(a: f64 , b: f64 ) -> f64  {
    a / b
}