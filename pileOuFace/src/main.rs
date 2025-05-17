use rand::Rng;

fn main() {
    let mut rng = rand::thread_rng();
    let pile_ou_face = if rng.gen_bool(0.5) { "Pile" } else { "Face" };
    println!("Résultat du pile ou face : {}", pile_ou_face);
}
