import zipfile
import os

def zipcmd():
    zip_filename = "backend_final.zip"
    source_dir = "backend"
    
    # Remove existing zip if it exists
    if os.path.exists(zip_filename):
        try:
            os.remove(zip_filename)
        except PermissionError:
            print(f"Error: Would verify if {zip_filename} is open.")
            return

    with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(source_dir):
            # Exclude venv and __pycache__ in place
            dirs[:] = [d for d in dirs if d not in ['venv', '__pycache__', '.git', 'node_modules']]
            
            for file in files:
                if file == "backend.zip": continue
                if file.endswith(".webm"): continue # Skip large debug files
                
                file_path = os.path.join(root, file)
                # Archive name should be relative to source_dir so content is at root of zip?
                # Catalyst AppSail expects the content at root or formatted correctly.
                # If I zip 'backend', usually I want content IN backend.
                # But 'make_archive' would put contents of backend at root of zip.
                # Let's keep structure sane: files inside backend/ should be at root of zip? 
                # Or should it be folder backend/?
                # Standard AppSail upload usually wants the files at the root of the zip.
                
                arcname = os.path.relpath(file_path, start=source_dir)
                zipf.write(file_path, arcname)
                
    print(f"Created {zip_filename} successfully.")

if __name__ == "__main__":
    zipcmd()
