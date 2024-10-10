from web3 import Web3
import json

# Connect to the Ethereum node
alchemy_url = "https://eth-sepolia.g.alchemy.com/v2/qkpUGif8EnAxzVR4BBkYf2E2krm11DLy"
private_key = "7b2145956c7dc5f91a09251939e4e11e03835d7f32bd1e052c8e99a0535a9406"
web3 = Web3(Web3.HTTPProvider(alchemy_url))

# Contract address (replace with your actual contract address)
contract_address = "0xB0486Ec5947DEef6Fe9C736bAAAE7cd51CEf44e6"

# Function to load ABI from a file
def load_contract_abi(file_path):
    try:
        with open(file_path, 'r') as abi_file:
            contract_json = json.load(abi_file)
            abi = contract_json['abi']  # Extract only the 'abi' part
        return abi
    except FileNotFoundError:
        print(f"Error: ABI file not found at {file_path}")
        return None
    except json.JSONDecodeError:
        print(f"Error: Failed to parse ABI file {file_path}")
        return None
    except KeyError:
        print("Error: 'abi' key not found in the JSON file")
        return None

# Load the ABI from a JSON file
abi_file_path = './abi/SupplyChain.json'  # Specify your ABI JSON file path
contract_abi = load_contract_abi(abi_file_path)

# Check if ABI is loaded successfully
if contract_abi:
    # Your wallet address (the one associated with the private key)
    account_address = web3.eth.account.from_key(private_key).address

    # Load the contract
    contract = web3.eth.contract(address=contract_address, abi=contract_abi)

    def authenticate_company_product(product_id, company_name):
        # Check if the product matches the company name
        try:
            # Call the contract's authenticateCompanyProduct function
            is_authenticated = contract.functions.authenticateCompanyProduct(product_id, company_name).call()
            
            if is_authenticated:
                print(f"Product {product_id} is manufactured by {company_name}.")
                return True
            else:
                print(f"Product {product_id} is NOT manufactured by {company_name}.")
                return False
        except Exception as e:
            print(f"Error during contract call: {e}")
            return False

    # Example usage
    product_id = 1
    company_name = "TestCompany"
    authenticate_company_product(product_id, company_name)
else:
    print("Failed to load the contract ABI.")
