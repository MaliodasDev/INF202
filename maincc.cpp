#include <iostream>
#include <vector>
#include <string>
#include <pqxx/pqxx> // Biblioteca para PostgreSQL

using namespace std;

class Funcionario {
private:
    string nome;
    float salario;
public:
    Funcionario(string n, float s) {
        nome = n;
        salario = s;
    }
    string getNome() { return nome; }
    float getSalario() { return salario; }
    
    void mostrarDados() {
        cout << "Nome: " << nome << endl;
        cout << "Salario: R$ " << salario << endl;
        cout << "----------------------" << endl;
    }
};

int main() {
    // 1. Pegar a URL de conexão do Railway via Variável de Ambiente
    const char* db_url = getenv("DATABASE_URL");
    
    if (!db_url) {
        cerr << "ERRO: Variavel de ambiente DATABASE_URL nao encontrada!" << endl;
        cerr << "Configure-a no Railway ou no seu terminal local." << endl;
        return 1;
    }

    try {
        // 2. Conectar ao banco de dados
        pqxx::connection C(db_url);
        if (!C.is_open()) {
            cerr << "Nao foi possivel abrir a conexao com o banco!" << endl;
            return 1;
        }

        // 3. Garantir que a tabela existe
        pqxx::work W_init(C);
        W_init.exec("CREATE TABLE IF NOT EXISTS funcionarios (id SERIAL PRIMARY KEY, nome VARCHAR(100), salario REAL);");
        W_init.commit();

        vector<Funcionario> funcionarios;

        // 4. Carregar dados do Banco (SELECT)
        pqxx::nontransaction N(C);
        pqxx::result R( N.exec("SELECT nome, salario FROM funcionarios") );
        
        for (auto row : R) {
            funcionarios.push_back(
                Funcionario(row[0].as<string>(), row[1].as<float>())
            );
        }

        cout << "\nFUNCIONARIOS CARREGADOS DO BANCO (RAILWAY)\n" << endl;
        for(int i = 0; i < funcionarios.size(); i++) {
            funcionarios[i].mostrarDados();
        }

        // 5. Cadastro de novo funcionário (Roda apenas localmente no terminal)
        string novoNome;
        float novoSalario;
        cout << "\nNovo funcionario" << endl;
        cout << "Nome: ";
        cin >> novoNome;
        cout << "Salario: ";
        cin >> novoSalario;

        // 6. Salvar novo funcionário no Banco (INSERT)
        pqxx::work W_insert(C);
        string sql = "INSERT INTO funcionarios (nome, salario) VALUES (" + 
                     W_insert.quote(novoNome) + ", " + 
                     to_string(novoSalario) + ");";
        W_insert.exec(sql);
        W_insert.commit();

        cout << "\nDados salvos com sucesso no PostgreSQL do Railway!" << endl;

    } catch (const exception &e) {
        cerr << "Erro no banco de dados: " << e.what() << endl;
        return 1;
    }

    return 0;
}