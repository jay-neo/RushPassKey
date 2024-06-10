use rand::Rng;
use crate::types::PasswordConfig;

fn generate_random_character(config: &PasswordConfig) -> char {
    let mut rng: rand::prelude::ThreadRng = rand::thread_rng();
    let mut chars: Vec<char> = vec![];

    if config.alphabet {
        chars.extend('a'..='z');
        if config.casing_enabled && config.casing == "upper" {
            chars.extend('A'..='Z');
        }
    }

    if config.number {
        chars.extend('0'..='9');
    }

    if config.symbols {
        chars.extend(['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', '|', ';', ':', ',', '.', '<', '>', '/', '?']);
    }

    let random_index: usize = rng.gen_range(0..chars.len());
    chars[random_index]
}

pub fn generate(config: &PasswordConfig) -> String {
    let mut rng: rand::prelude::ThreadRng = rand::thread_rng();
    let password_length: usize = rng.gen_range(config.min_password_value..=config.max_password_value);
    
    let password: String = std::iter::repeat_with(|| generate_random_character(config))
        .take(password_length)
        .collect();

    password
}
