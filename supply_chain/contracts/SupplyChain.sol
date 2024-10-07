// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    
    // Product step structure for tracking history
    struct ProductStep {
        string status;
        string location;
        address stakeholder;
        uint256 timestamp;
    }

    // Product Structure
    struct Product {
        uint256 productId;
        string productName;
        string companyName;  // Added company name for authentication
        address manufacturer;
        address currentOwner;
        uint256 creationTimestamp;
    }

    // Mapping from productId to Product details
    mapping(uint256 => Product) public products;

    // Mapping from productId to an array of all steps the product has been through
    mapping(uint256 => ProductStep[]) public productSteps;

    // Event for logging new products
    event ProductAdded(uint256 productId, string productName, string companyName, address indexed manufacturer);

    // Event for tracking status updates
    event ProductStatusUpdated(uint256 productId, string status, string location, address indexed updatedBy);

    // Modifier to ensure only the current owner can update the status
    modifier onlyOwner(uint256 _productId) {
        require(products[_productId].currentOwner == msg.sender, "Not the current owner.");
        _;
    }

    // Function to add a new product by the manufacturer
    function addProduct(uint256 _productId, string memory _productName, string memory _companyName, string memory _location) public {
        require(products[_productId].productId == 0, "Product already exists!");

        // Add the product to the mapping
        products[_productId] = Product({
            productId: _productId,
            productName: _productName,
            companyName: _companyName,  // Store the company name
            manufacturer: msg.sender,
            currentOwner: msg.sender,
            creationTimestamp: block.timestamp
        });

        // Add the first step: Manufacturing
        productSteps[_productId].push(ProductStep({
            status: "Manufactured",
            location: _location,
            stakeholder: msg.sender,
            timestamp: block.timestamp
        }));

        // Emit event for product addition
        emit ProductAdded(_productId, _productName, _companyName, msg.sender);
    }

    // Function to update product status (e.g., shipped, delivered)
    function updateStatus(uint256 _productId, string memory _status, string memory _location) public onlyOwner(_productId) {
        products[_productId].currentOwner = msg.sender;
        
        // Add a new step to the product's history
        productSteps[_productId].push(ProductStep({
            status: _status,
            location: _location,
            stakeholder: msg.sender,
            timestamp: block.timestamp
        }));

        // Emit event for status update
        emit ProductStatusUpdated(_productId, _status, _location, msg.sender);
    }

    // Function to transfer ownership of the product
    function transferOwnership(uint256 _productId, address _newOwner) public onlyOwner(_productId) {
        products[_productId].currentOwner = _newOwner;
    }

    // Function to get product details
    function getProductDetails(uint256 _productId) public view returns (
        uint256,
        string memory,
        string memory,
        address,
        address,
        uint256
    ) {
        Product memory product = products[_productId];
        return (
            product.productId,
            product.productName,
            product.companyName,
            product.manufacturer,
            product.currentOwner,
            product.creationTimestamp
        );
    }

    // Function to get the full history of a product
    function getProductHistory(uint256 _productId) public view returns (ProductStep[] memory) {
        return productSteps[_productId];
    }

    // Function to authenticate the product by checking its history
    function authenticateProduct(uint256 _productId) public view returns (ProductStep[] memory) {
        return productSteps[_productId];
    }

    // Get the last status of the product
    function getLastProductStatus(uint256 _productId) public view returns (string memory status, string memory location, address stakeholder, uint256 timestamp) {
        require(productSteps[_productId].length > 0, "No history for this product.");

        ProductStep memory lastStep = productSteps[_productId][productSteps[_productId].length - 1];
        return (lastStep.status, lastStep.location, lastStep.stakeholder, lastStep.timestamp);
    }

    // Authenticate if a company name matches the manufacturer of a given product
    function authenticateCompanyProduct(uint256 _productId, string memory _companyName) public view returns (bool) {
        // Check if the product exists
        require(products[_productId].productId != 0, "Product does not exist.");
        
        // Compare the provided company name with the stored company name
        if (keccak256(abi.encodePacked(products[_productId].companyName)) == keccak256(abi.encodePacked(_companyName))) {
            return true;
        }
        return false;
    }
}
