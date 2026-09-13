const user = {
  name: 'Akeem',
  role: 'Trainee Engineer',
  yearsOfExperience: 3,
  favoriteLanguages: ['JavaScript', 'Python', 'Java']
};

console.log(`Name (dot notation): ${user.name}`);
console.log(`First favorite language (bracket notation): ${user['favoriteLanguages'][0]}`);

user.isLearningNodeJS = true;

console.log('Full user object:', user);
